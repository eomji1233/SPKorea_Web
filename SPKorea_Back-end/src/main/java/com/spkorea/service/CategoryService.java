package com.spkorea.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.spkorea.entity.Category;
import com.spkorea.repository.CategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class CategoryService {
	
    private final CategoryRepository categoryRepository;
    
    public CategoryService(CategoryRepository categoryRepository) {
    	this.categoryRepository = categoryRepository;
    }
    
    @Transactional
    public Category getOrCreateCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> categoryRepository.save(new Category(name)));
    }
    
    public List<String> getAllCategoryNames() {
        return categoryRepository.findAll().stream()
                .map(Category::getName)
                .collect(Collectors.toList());
    }
    
}
 