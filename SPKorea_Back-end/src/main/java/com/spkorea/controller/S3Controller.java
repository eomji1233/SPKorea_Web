package com.spkorea.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spkorea.service.S3Service;

@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;

    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/presign")
    public ResponseEntity<Map<String, String>> getPresignedUrl(
        @RequestParam String key,
        @RequestParam String contentType
    ) {
        
        String presignedUrl = s3Service.generatePresignedUrl(key, contentType);
        Map<String, String> response = new HashMap<>();
        response.put("url", presignedUrl);
        return ResponseEntity.ok(response);
    }

}
