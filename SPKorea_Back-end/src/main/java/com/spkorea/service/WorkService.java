package com.spkorea.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.spkorea.dto.MainThumbnailDto;
import com.spkorea.dto.NewThumbnailDto;
import com.spkorea.dto.WorkRequestDto;
import com.spkorea.dto.WorkResponseDto;
import com.spkorea.entity.Category;
import com.spkorea.entity.Work;
import com.spkorea.entity.WorkImage;
import com.spkorea.repository.CategoryRepository;
import com.spkorea.repository.WorkImageRepository;
import com.spkorea.repository.WorkRepository;

@Service
public class WorkService {

    private final WorkRepository workRepository;
    private final WorkImageRepository workImageRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    public WorkService(WorkRepository workRepository, WorkImageRepository workImageRepository, CategoryRepository categoryRepository, CategoryService categoryService) {
        this.workRepository = workRepository;
        this.workImageRepository = workImageRepository;
		this.categoryRepository = categoryRepository;
		this.categoryService = categoryService;
    }

    @Transactional
    public Work saveWork(WorkRequestDto dto) throws RuntimeException {
    	Category category = categoryService.getOrCreateCategoryByName(dto.getCategory());

    	
        Work work = Work.builder()
                .title(dto.getTitle())
                .category(category)
                .type(dto.getType())
                .year(dto.getYear())
                .description(dto.getDescription())
                .link(dto.getLink())
                .thumbnailUrl(dto.getThumbnailUrl())
                .videoUrl(dto.getVideoUrl())
                .build();

        // 저장 (id 생성됨)
        Work savedWork = workRepository.save(work);

        // 이미지 목록 저장 (imageUrls 리스트로)
        if (dto.getImages() != null) {
            List<WorkImage> imageEntities = new ArrayList<>();
            int order = 0;
            for (String imageUrl : dto.getImages()) {
                WorkImage image = new WorkImage();
                image.setWork(savedWork);
                image.setImageUrl(imageUrl);
                image.setSortOrder(order++);
                imageEntities.add(image);
            }
            workImageRepository.saveAll(imageEntities);
        }

        return savedWork;
    }
    
    public List<WorkResponseDto> getAllWorks() {
        return workRepository.findAll().stream()
            .map(WorkResponseDto::from)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public Work getWorkById(Long id) {
        return workRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 작업물이 없습니다. id=" + id));
    }
    
    @Transactional
    public Work updateWork(Long id, WorkRequestDto dto) {
        Work work = workRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 작업물이 없습니다. id=" + id));
        Category category = categoryService.getOrCreateCategoryByName(dto.getCategory());
        work.updateFromDto(dto, category);
        return work;
    }
    
    @Transactional
    public void deleteWork(Long id) {
        Work work = workRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 작업물이 없습니다. id=" + id));
        workRepository.delete(work);
    }

    public List<MainThumbnailDto> getMainThumbnails() {
    	return workRepository.findThumbnailsByCategory();
    }

    public List<NewThumbnailDto> getNewThumbnails() {
    	return workRepository.findThumbnailsByCategoryDesc();
    }
}
