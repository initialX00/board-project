package com.korit.boardback.controller;

import com.korit.boardback.security.principal.PrincipalUser;
import com.korit.boardback.service.FileService;
import com.korit.boardback.service.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    public ResponseEntity<?> getLoginUser(@AuthenticationPrincipal PrincipalUser principalUser) {
        //아래 주석과 PrincipalUser로 불러오는것과 같다.
        //PrincipalUser principalUser2 =
        // (PrincipalUser) SecurityContextHolder
        // .getContext().getAuthentication().getPrincipal();

        if(principalUser.getUser().getProfileImg() == null) {
            principalUser.getUser().setProfileImg("default.png");
        }
        return ResponseEntity.ok().body(principalUser.getUser());
    }

    @PostMapping("/user/profile/img")
    public ResponseEntity<?> changeProfileImg(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestPart MultipartFile file) { //리액트에서 받은 파일 받기
        //System.out.println(file.getOriginalFilename());
        userService.updateProfileImg(principalUser.getUser(), file);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/profile/nickname")
    public ResponseEntity<?> changeNickname(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        System.out.println(requestBody.get("nickname"));
        String nickname = requestBody.get("nickname");
        userService.updateNickname(principalUser.getUser(), nickname);
        return ResponseEntity.ok().build();
    }

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
}
