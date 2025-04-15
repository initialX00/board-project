package com.korit.boardback.service;

import com.korit.boardback.dto.request.ReqJoinDto;
import com.korit.boardback.dto.request.ReqLoginDto;
import com.korit.boardback.entity.User;
import com.korit.boardback.entity.UserRole;
import com.korit.boardback.exception.DuplicatedValueException;
import com.korit.boardback.exception.FieldError;
import com.korit.boardback.repository.UserRepository;
import com.korit.boardback.repository.UserRoleRepository;
import com.korit.boardback.security.jwt.JwtUtil;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; //비밀번호 암호화
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private EmailService emailService;

    //사용자 이름을 통해 정보 조회
    public User getUserByUsername(String username) throws Exception {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new NotFoundException("사용자를 찾지 못했습니다."));
    }

    //사용자 이름이 이미 존재하는지 확인하는 메서드, 이미 있으면 true, 없으면 false
    public boolean duplicatedByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    //회원가입 처리
    @Transactional(rollbackFor = Exception.class)
    public User join(ReqJoinDto reqJoinDto) {
        //중복된 사용자 이름 존재 시 예외처리
        if(duplicatedByUsername(reqJoinDto.getUsername())) {
            throw new DuplicatedValueException(
                    List.of(FieldError.builder()
                        .field("username")
                        .message("이미 존재하는 사용자이름입니다.")
                        .build()));
        }

        User user = User.builder()
                .username(reqJoinDto.getUsername())
                .password(passwordEncoder.encode(reqJoinDto.getPassword()))
                .email(reqJoinDto.getEmail())
                .nickname(reqJoinDto.getUsername())
                .accountExpired(1)  //계정 만료 여부
                .accountLocked(1) //계정 잠금 여부
                .credentialsExpired(1) //자격 증명 만료 여부
                .accountEnabled(0) //이메일 인증되지 않은 상태로 초기화
                .build();
        userRepository.save(user); //인증 정보 저장

        UserRole userRole = UserRole.builder()
                .userId(user.getUserId()) //사용자 ID
                .roleId(1) //권한 ID, 원래는 셀렉트로 가져와야댐
                .build();
        userRoleRepository.save(userRole); //사용자 정보 저장

        //인즌 이메일 발송
        try { //트라이캐치에 걸리면 롤백되지 않는다.
            emailService.sendAuthMail(reqJoinDto.getEmail(), reqJoinDto.getUsername());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    //로그인 처리 메서드
    public String login(ReqLoginDto dto) {
        //사용자 조회
        User user = userRepository
                .findByUsername(dto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("사용자 정보를 다시 확인하세요."));

        if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("사용자 정보를 다시 확인하세요.");
        }

        // 이메일 인증 여부 확인
        if(user.getAccountEnabled() == 0) {
            throw new DisabledException("이메일 인증이 필요합니다.");
        }
        //jwt 만료시간 설정
        Date expires = new Date(new Date().getTime() + (1000l * 60 * 60 * 24 * 7));

        //jwt 토큰 생성하여 반환
        return jwtUtil.generateToken(
                user.getUsername(), //사용자 이름
                Integer.toString(user.getUserId()), //사용자 ID
                expires); //만료시간
    }

    //프로필 이미지 수정 메서드
    @Transactional(rollbackFor = Exception.class)
    public void updateProfileImg(User user, MultipartFile file) {
        //파일 저장 경로
        final String PROFILE_IMG_FILE_PATH = "/upload/user/profile";
        //파일 경로와 이름 저장
        String savedFileName = fileService.saveFile(PROFILE_IMG_FILE_PATH, file);
        //사용자 프로필 이미지 경로 수정
        userRepository.updateProfileImg(user.getUserId(), savedFileName);
        //기존 프로필 이미지 삭제
        if(user.getProfileImg() == null) {return;}
        fileService.deleteFile(PROFILE_IMG_FILE_PATH + "/" + user.getProfileImg());
    }

    //사용자 닉네임 업데이트
    @Transactional(rollbackFor = Exception.class)
    public void updateNickname(User user, String nickname) {
        userRepository.updateNickname(user.getUserId(), nickname);
    }

    //사용자 비밀번호 업데이트
    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(User user, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        userRepository.updatePassword(user.getUserId(), encodedPassword);
    }

    //사용자 이메일 업데이트
    @Transactional(rollbackFor = Exception.class)
    public void updateEmail(User user, String email) {
        userRepository.updateEmail(user.getUserId(), email);
    }

}
