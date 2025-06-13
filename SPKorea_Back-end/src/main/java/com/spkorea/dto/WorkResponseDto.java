// com.spkorea.dto.WorkResponseDto.java

package com.spkorea.dto;

import java.util.List;

import com.spkorea.entity.Work;
import com.spkorea.entity.WorkImage;

public class WorkResponseDto {
    private Long id;
    private String title;
    private String category;
    private String type;
    private String year;
    private String description;
    private String link;
    private String thumbnailUrl;
    private List<String> images;
    private String videoUrl;

    // 생성자
    public WorkResponseDto() {}

    public WorkResponseDto(Long id, String title, String category, String type, String year,
                           String description, String link, String thumbnailUrl,
                           List<String> images, String videoUrl) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.type = type;
        this.year = year;
        this.description = description;
        this.link = link;
        this.thumbnailUrl = thumbnailUrl;
        this.images = images;
        this.videoUrl = videoUrl;
    }

    // Getter/Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public String getVideo() { return videoUrl; }
    public void setVideo(String video) { this.videoUrl = video; }
    
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final WorkResponseDto dto = new WorkResponseDto();

        public Builder id(Long id) {
            dto.setId(id);
            return this;
        }

        public Builder title(String title) {
            dto.setTitle(title);
            return this;
        }

        public Builder category(String category) {
            dto.setCategory(category);
            return this;
        }

        public Builder type(String type) {
            dto.setType(type);
            return this;
        }

        public Builder year(String year) {
            dto.setYear(year);
            return this;
        }

        public Builder description(String description) {
            dto.setDescription(description);
            return this;
        }

        public Builder link(String link) {
            dto.setLink(link);
            return this;
        }

        public Builder images(List<String> images) {
            dto.setImages(images);
            return this;
        }

        public Builder video(String video) {
            dto.setVideo(video);
            return this;
        }

        public Builder thumbnailUrl(String thumbnailUrl) {
            dto.setThumbnailUrl(thumbnailUrl);
            return this;
        }

        public WorkResponseDto build() {
            return dto;
        }
    }

    
    public static WorkResponseDto from(Work work) {
        List<String> imageUrls = work.getImages().stream()
            .map(WorkImage::getImageUrl)
            .toList();

        return WorkResponseDto.builder()
            .id(work.getId())
            .title(work.getTitle())
            .category(work.getCategory().getName())
            .type(work.getType())
            .year(String.valueOf(work.getYear()))
            .description(work.getDescription())
            .link(work.getLink())
            .images(imageUrls) // 여기에 URL 리스트 들어감
            .video(work.getVideoUrl())
            .thumbnailUrl(work.getThumbnailUrl())
            .build();
    }
}
