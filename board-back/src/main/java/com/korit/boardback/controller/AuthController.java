package com.korit.boardback.controller;

import com.korit.boardback.dto.request.ReqAuthEmailDto;
import com.korit.boardback.dto.request.ReqJoinDto;
import com.korit.boardback.dto.request.ReqLoginDto;
import com.korit.boardback.dto.response.RespTokenDto;
import com.korit.boardback.entity.User;
import com.korit.boardback.service.EmailService;
import com.korit.boardback.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Operation(summary = "회원가입", description = "회원가입 설명")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody ReqJoinDto dto) {
        return ResponseEntity.ok().body(userService.join(dto));
    }

    @Operation(summary = "로그인", description = "로그인 설명")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ReqLoginDto dto) {
        //System.out.println(dto);
        RespTokenDto respTokenDto = RespTokenDto.builder()
                .type("JWT")
                .name("AccessToken")
                .token(userService.login(dto))
                .build();

        return ResponseEntity.ok().body(respTokenDto);
    }

    @PostMapping("/email")
    public ResponseEntity<?> sendAuthEmail(@RequestBody ReqAuthEmailDto dto) throws Exception {
        User user = userService.getUserByUsername(dto.getUsername());
        emailService.sendAuthMail(user.getEmail(), dto.getUsername());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/email")
    public ResponseEntity<?> setAuthMail(
            @RequestParam String username,
            @RequestParam String token
    ) {

        String script = String.format("""
                <script>
                    alert("%s");
                    window.close();
                </script>
                """, emailService.auth(username, token));
        return ResponseEntity.ok().header("Content-Type", "text/html; charset=utf-8").body(script);
    }
}