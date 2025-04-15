package com.korit.boardback.security.filter;

import com.korit.boardback.entity.User;
import com.korit.boardback.repository.UserRepository;
import com.korit.boardback.security.jwt.JwtUtil;
import com.korit.boardback.security.principal.PrincipalUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //HttpServletRequest로 변환하여 JWT토큰을 추출하고 인증처리
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        //요청에서 엑세스 토큰을 추출하여 인증을 수행
        jwtAuthentication(getAccessToken(request));
        //필터체인의 다음 필터로 요청을 전달
        filterChain.doFilter(servletRequest, servletResponse);
    }

    //JWT인증 처리
    private void jwtAuthentication(String accessToken) {
        if(accessToken == null) {return;}
        Claims claims = jwtUtil.parseToken(accessToken); //토큰을 파싱하여 Claims 객체로 저장

        int userId = Integer.parseInt(claims.getId()); //id추출
        User user = userRepository.findById(userId).get(); //id를 기반으로 db조회

        //사용자 정보를 기반으로 PrincipalUser 객체 생성
        PrincipalUser principalUser = PrincipalUser.builder().user(user).build();
        //사용자의 인증 정보와 권한을 설정
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principalUser, null, principalUser.getAuthorities());
        //인증 정보를 SecurityContext에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    //HttpSevletRequset에서 엑세스 토큰을 추출
    private String getAccessToken(HttpServletRequest request) {
        String accessToken = null;
        String authorization = request.getHeader("Authorization");

        //Authoization 헤더가 "Bearer "로 시작하기에 그 뒤의 토큰을 추출
        if (authorization != null && authorization.startsWith("Bearer ")) {
            accessToken = authorization.substring(7);
        }

        return accessToken;
    }

}