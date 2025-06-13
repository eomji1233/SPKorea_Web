package com.spkorea.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spkorea.dto.LoginRequestDto;
import com.spkorea.dto.LoginResponseDto;
import com.spkorea.dto.SignupRequestDto;
import com.spkorea.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	 private final AuthService authService;
	 
	 public AuthController(AuthService authService) {
		this.authService = authService;
	 }

	    @PostMapping("/signup")
	    public ResponseEntity<?> signup(@RequestBody SignupRequestDto requestDto) {
	        try {
	        	authService.registerUser(requestDto);
	        	return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
	        } catch (IllegalArgumentException e) {
	        	return ResponseEntity
	        			.badRequest()
	        			.body(Map.of("message", e.getMessage()));
	        } catch (Exception e) {
	        	return ResponseEntity
	        			.status(HttpStatus.INTERNAL_SERVER_ERROR)
	        			.body(Map.of("message", "서버 오류가 발생했습니다."));
	        }
	    }
	    
	    @PostMapping("/login")
	    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
	        LoginResponseDto response = authService.login(request);
	        return ResponseEntity.ok(response);
	    }
}
