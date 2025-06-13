package com.spkorea.dto;

public class NewThumbnailDto {
	private Long workId;
	private String title;
	private String type;
	private String thumbnailUrl;
	public Long getWorkId() {
		return workId;
	}
	public void setWorkId(Long workId) {
		this.workId = workId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getThumbnailUrl() {
		return thumbnailUrl;
	}
	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	public NewThumbnailDto(Long workId, String title, String type, String thumbnailUrl) {
		super();
		this.workId = workId;
		this.title = title;
		this.type = type;
		this.thumbnailUrl = thumbnailUrl;
	}
	
	

}
