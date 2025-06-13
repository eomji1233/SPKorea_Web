package com.spkorea.dto;

public class MainThumbnailDto {
	private Long workId;
	private String categoryName;
	private String thumbnailUrl;
	
	public MainThumbnailDto(Long workId, String categoryName, String thumbnailUrl) {
		this.workId = workId;
		this.categoryName = categoryName;
		this.thumbnailUrl = thumbnailUrl;
	}

	public Long getWorkId() {
		return workId;
	}

	public void setWorkId(Long workId) {
		this.workId = workId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	
	
	

}
