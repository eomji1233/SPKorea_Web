package com.spkorea.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	private final JwtUtil jwtUtil;
	
	public SecurityConfig(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(jwtUtil);
        http
        	.cors(Customizer.withDefaults()) 
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
				.requestMatchers("/api/auth/**").permitAll() // 로그인, 회원가입은 모두 허용
				.requestMatchers("/api/s3/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/work/**").permitAll() // 포트폴리오 목록, 상세 조회 모두 허용
				.requestMatchers(HttpMethod.GET, "/api/work/thumbnails/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/category/**").permitAll() // 카테고리 조회도 모두 허용
				.requestMatchers("/", "/index.html", "/favicon.ico").permitAll()
				.requestMatchers("/api/contact").permitAll()
				.anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT니까 세션 사용 안함
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
