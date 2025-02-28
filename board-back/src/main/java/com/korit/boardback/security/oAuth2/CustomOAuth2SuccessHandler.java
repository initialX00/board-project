package com.korit.boardback.security.oAuth2;

import com.korit.boardback.entity.User;
import com.korit.boardback.security.jwt.JwtUtil;
import com.korit.boardback.security.principal.PrincipalUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value(value = "${react.server.protocol}")
    private String protocol;
    @Value(value = "${react.server.host}")
    private String host;
    @Value(value = "${react.server.port}")
    private int port;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication);
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();
        System.out.println(user);
        Date expries = new Date(new Date().getTime() + (1000 * 60 * 60 * 7));
        String accessToken = jwtUtil
                .generateToken(user.getUsername(), Integer.toString(user.getUserId()), expries);
        response.sendRedirect(String.format("%s://%s:%d/auth/login/oauth2?accessToken=%s", protocol, host, port, accessToken));

    }
}
