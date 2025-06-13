package com.spkorea.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spkorea.entity.WorkImage;

public interface WorkImageRepository extends JpaRepository<WorkImage, Long> {
	List<WorkImage> findByWorkIdOrderBySortOrderAsc(Long workId);
}
