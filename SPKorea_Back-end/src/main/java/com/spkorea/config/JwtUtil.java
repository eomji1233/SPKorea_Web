package com.spkorea.config;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "your-secret-key-goes-here-make-it-long-enough-256bit";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 2; // 2시간

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ✅ 토큰 생성
    public String generateToken(String username, String roles) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ 토큰에서 사용자 이름 추출
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    // ✅ 토큰에서 roles 추출
    public String extractRoles(String token) {
        return parseClaims(token).get("roles", String.class);
    }

    // ✅ 토큰 유효성 검사
    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException |
                 IllegalArgumentException | SecurityException e) {
            return false;
        }
    }

    // 내부용: 클레임 파싱
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

