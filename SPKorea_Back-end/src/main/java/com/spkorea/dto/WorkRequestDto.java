package com.spkorea.dto;

import java.util.List;

public class WorkRequestDto {
    private String title;
    private String categoryId;
    private String type;
    private int year;
    private String description;
    private String link;
    private String thumbnailUrl;        
    private List<String> images;    
    private String videoUrl;           

    // 기본 생성자
    public WorkRequestDto() {}

    // 전체 생성자
    public WorkRequestDto(String title, String categoryId, String type, int year,
                          String description, String link, String thumbnailUrl,
                          List<String> images, String videoUrl) {
        this.title = title;
        this.categoryId = categoryId;
        this.type = type;
        this.year = year;
        this.description = description;
        this.link = link;
        this.thumbnailUrl = thumbnailUrl;
        this.images = images;
        this.videoUrl = videoUrl;
    }

    // Getter/Setter
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return categoryId; }
    public void setCategory(String categoryId) { this.categoryId = categoryId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; } 

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> imageUrls) { this.images = imageUrls; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
}
