package com.korit.boardback.controller;

import com.korit.boardback.security.principal.PrincipalUser;
import com.korit.boardback.service.EmailService;
import com.korit.boardback.service.FileService;
import com.korit.boardback.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
//board_category_id , name
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    //로그인한 사용자 정보를 가져오는 메서드
    @GetMapping("/user/me")
    public ResponseEntity<?> getLoginUser(@AuthenticationPrincipal PrincipalUser principalUser) {
        //아래 주석과 PrincipalUser로 불러오는것과 같다.
        //PrincipalUser principalUser2 =
        // (PrincipalUser) SecurityContextHolder
        // .getContext().getAuthentication().getPrincipal();

        //프로필 이미지가 없으면 기본이미지 사용
        if(principalUser.getUser().getProfileImg() == null) {
            principalUser.getUser().setProfileImg("default.png");
        }
        return ResponseEntity.ok().body(principalUser.getUser());
    }

    //프로필 이미지 변경
    @PostMapping("/user/profile/img")
    public ResponseEntity<?> changeProfileImg(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestPart MultipartFile file) { //리액트에서 받은 파일 받기
        //System.out.println(file.getOriginalFilename());
        userService.updateProfileImg(principalUser.getUser(), file);
        return ResponseEntity.ok().build(); //성공적으로 처리된 경우 HTTP 200 OK응답
    }

    //닉네임 변경
    @PutMapping("/user/profile/nickname")
    public ResponseEntity<?> changeNickname(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        //System.out.println(requestBody.get("nickname"));
        String nickname = requestBody.get("nickname");
        userService.updateNickname(principalUser.getUser(), nickname);
        return ResponseEntity.ok().build();
    }

    //비밀번호 변경
    @PutMapping("/user/profile/password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        //System.out.println(requestBody.get("password"));
        String password = requestBody.get("password");
        userService.updatePassword(principalUser.getUser(), password);
        return ResponseEntity.ok().build();
    }

    //이메일 변경을 위한 코드 발송
    @PostMapping("/user/profile/email/send")
    public ResponseEntity<?> sendEmailChangeVerification(
            @RequestBody Map<String, String> requestBody
    ) throws MessagingException {
        String email = requestBody.get("email");
        String code = emailService.generateEmailCode(); //이메일 인증 코드 전송
        emailService.sendChangeEmailVerification(email, code);
        return ResponseEntity.ok().body(code);
    }

    //이메일 변경
    @PutMapping("/user/profile/email")
    public ResponseEntity<?> changeEmail(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String email = requestBody.get("email");
        userService.updateEmail(principalUser.getUser(), email);
        return ResponseEntity.ok().build();
    }
}
