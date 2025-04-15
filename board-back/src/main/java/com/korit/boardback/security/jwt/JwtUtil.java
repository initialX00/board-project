package com.korit.boardback.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private Key key; //jwt 서명에 사용될 비밀 키

    //생성자에게 비밀 키를 디코딩하여 설정
    public JwtUtil(@Value("${jwt.secret}") String secret) {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    //jwt 토큰을 생성하는 메서드
    public String generateToken(String subject, String id, Date expires) {
        return Jwts.builder()
                .setSubject(subject) //토큰 이름
                .setId(id) //토큰 ID
                .setExpiration(expires) //만료시간
                .signWith(key, SignatureAlgorithm.HS256) //서명
                .compact(); //jwt 토큰 설정
    }

    //jwt 토큰을 파싱하는 메서드, claims는 jwt토큰의 정보를 저장하는데 사용되는 객체이다
    public Claims parseToken(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }
}