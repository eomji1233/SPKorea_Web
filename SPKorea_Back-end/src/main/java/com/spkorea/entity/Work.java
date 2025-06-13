package com.spkorea.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.spkorea.dto.WorkRequestDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

@Entity
@Table(name = "works")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String type;

    private int year;

    @Column(length = 1000)
    private String description;

    private String link;

    @OneToMany(mappedBy = "work", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    // cascade = CascadeType.ALL : work 저장 시 image도 자동 저장
    // orphanRemoval = true : work에서 image 제거하면 DB에서도 삭제됨
    // 이렇게 하면 Hibernate가 SELECT 시 ORDER BY sort_order를 자동으로 붙여줌
    private List<WorkImage> images = new ArrayList<>();

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "video_url")
    private String videoUrl;

    // === 생성자 ===
    public Work() {}

    public Work(Long id, String title, Category category, String type, int year,
                String description, String link, List<WorkImage> images, String thumbnailUrl, String videoUrl) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.type = type;
        this.year = year;
        this.description = description;
        this.link = link;
        this.images = images;
        this.thumbnailUrl = thumbnailUrl;
        this.videoUrl = videoUrl;
    }

    // === Getter & Setter ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public List<WorkImage> getImages() { return images; }
    public void setImages(List<WorkImage> images) { this.images = images; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    // === Builder ===
    public static class Builder {
        private Long id;
        private String title;
        private Category category;
        private String type;
        private int year;
        private String description;
        private String link;
        private List<WorkImage> images = new ArrayList<>();
        private String thumbnailUrl;
        private String videoUrl;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder category(Category category) { this.category = category; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder year(int year) { this.year = year; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder link(String link) { this.link = link; return this; }
        public Builder images(List<WorkImage> images) { this.images = images; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder videoUrl(String videoUrl) { this.videoUrl = videoUrl; return this; }

        public Work build() {
            return new Work(id, title, category, type, year, description, link, images, thumbnailUrl, videoUrl);
        }
    }

    public void updateFromDto(WorkRequestDto dto, Category category) {
        this.title = dto.getTitle();
        this.category = category;
        this.type = dto.getType();
        this.year = dto.getYear();
        this.description = dto.getDescription();
        this.link = dto.getLink();

        // 1. 기존 이미지 URL → WorkImage 맵핑
        Map<String, WorkImage> existingImageMap = this.images.stream()
                .collect(Collectors.toMap(WorkImage::getImageUrl, Function.identity()));

        // 2. 순서대로 새 리스트 구성
        List<WorkImage> updatedImages = new ArrayList<>();

        for (int i = 0; i < dto.getImages().size(); i++) {
            String imageUrl = dto.getImages().get(i);
            WorkImage image = existingImageMap.getOrDefault(imageUrl, new WorkImage(imageUrl, this));
            image.setSortOrder(i); // ✅ 순서 저장
            updatedImages.add(image);
        }

        // 3. 연관관계 재설정 (JPA 자동 dirty checking)
        this.images.clear();
        this.images.addAll(updatedImages);

        this.thumbnailUrl = dto.getThumbnailUrl();
        this.videoUrl = dto.getVideoUrl();
    }


    public static Builder builder() {
        return new Builder();
    }

}
