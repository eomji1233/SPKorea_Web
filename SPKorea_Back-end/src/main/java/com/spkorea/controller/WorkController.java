package com.spkorea.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spkorea.dto.MainThumbnailDto;
import com.spkorea.dto.NewThumbnailDto;
import com.spkorea.dto.WorkRequestDto;
import com.spkorea.dto.WorkResponseDto;
import com.spkorea.entity.Work;
import com.spkorea.service.WorkService;

@RestController
@RequestMapping("/api/work")
public class WorkController {

    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<WorkResponseDto> createWork(@RequestBody WorkRequestDto dto) {
        Work saved = workService.saveWork(dto);
        return ResponseEntity.ok(WorkResponseDto.from(saved));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<WorkResponseDto>> getAllWorks() {
        return ResponseEntity.ok(workService.getAllWorks());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<WorkResponseDto> getWork(@PathVariable Long id) {
        Work work = workService.getWorkById(id);
        return ResponseEntity.ok(WorkResponseDto.from(work));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<WorkResponseDto> updateWork(@PathVariable Long id, @RequestBody WorkRequestDto dto) {
        Work updated = workService.updateWork(id, dto);
        return ResponseEntity.ok(WorkResponseDto.from(updated));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        workService.deleteWork(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/thumbnails")
    public ResponseEntity<List<MainThumbnailDto>> getMainThumbnails() {
    	return ResponseEntity.ok(workService.getMainThumbnails());
    }
    
    @GetMapping("/new")
    public ResponseEntity<List<NewThumbnailDto>> getNewThumbnails() {
    	return ResponseEntity.ok(workService.getNewThumbnails());
    }
}
