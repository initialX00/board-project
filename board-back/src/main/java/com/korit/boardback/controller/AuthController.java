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

    //회원가입
    @Operation(summary = "회원가입", description = "회원가입 설명")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody ReqJoinDto dto) {
        return ResponseEntity.ok().body(userService.join(dto)); //회원가입 후 성공응답
    }

    //로그인
    @Operation(summary = "로그인", description = "로그인 설명")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ReqLoginDto dto) {
        /**
         * UserService -> login()
         * User객체 findByUsername
         * user가 있으면 비밀번호 일치하는지 확인
         * 비밀번호가 일치하면 JWT 응답
         * JwtUtil -> secret 세팅
         *
         */
        RespTokenDto respTokenDto = RespTokenDto.builder()
                .type("JWT") //토큰설정
                .name("AccessToken") //토큰이름설정
                .token(userService.login(dto)) //토큰 생성
                .build();

        return ResponseEntity.ok().body(respTokenDto); //응답으로 jwt반환
    }

    //인증 이메일 발송
    @PostMapping("/email")
    public ResponseEntity<?> sendAuthEmail(@RequestBody ReqAuthEmailDto dto) throws Exception {
        User user = userService.getUserByUsername(dto.getUsername()); //사용자 정보조회
        emailService.sendAuthMail(user.getEmail(), dto.getUsername()); //이메일 발송
        return ResponseEntity.ok().build(); //이메일 전송 후 성공 응답
    }

    //인증 메일 처리
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
        // emailService.auth()로 인증을 처리하고 그 결과 메시지를 알림으로 표시

        // 응답으로 HTML 스크립트를 반환하여 인증 결과를 사용자에게 보여주기
        return ResponseEntity.ok().header("Content-Type", "text/html; charset=utf-8").body(script);
    }
}