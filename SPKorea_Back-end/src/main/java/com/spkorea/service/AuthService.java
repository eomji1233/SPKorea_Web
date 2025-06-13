package com.spkorea.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spkorea.config.JwtUtil;
import com.spkorea.dto.LoginRequestDto;
import com.spkorea.dto.LoginResponseDto;
import com.spkorea.dto.SignupRequestDto;
import com.spkorea.entity.User;
import com.spkorea.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
    }

    public void registerUser(SignupRequestDto requestDto) {
        String username = requestDto.getUsername();
        String email = requestDto.getEmail();
        String rawPassword = requestDto.getPassword();

        // 중복 ID 확인
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(rawPassword);

        // 사용자 생성 (기본 역할: ROLE_USER)
        User user = User.builder()
                .username(username)
                .email(email)
                .password(encodedPassword)
                .roles("ROLE_USER")
                .build();

        userRepository.save(user);
    }
    
    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 올바르지 않습니다.");
        }

        String roles = user.getRoles();

        String token = jwtUtil.generateToken(user.getUsername(), roles);

        return new LoginResponseDto(token);
    }
}