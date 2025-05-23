package com.korit.boardback.service;

import com.korit.boardback.entity.User;
import com.korit.boardback.repository.UserRepository;
import com.korit.boardback.security.jwt.JwtUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.crypto.Data;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    private final String FROM_EMAIL = "skjil1218@gmail.com";

    @Autowired(required = false)
    private JavaMailSender javaMailSender; //이메일을 보내는데 사용되는 양식
    @Autowired
    private JwtUtil jwtUtil; //JWT토큰을 생성
    @Autowired
    private UserRepository userRepository; //사용자 정보 관리

    @Async //이메일을 비동기로 발송, 이메일 처리에 시간이 걸리므로 비동기 처리
    public void sendAuthMail(String to, String username) throws MessagingException {
        //인증용 이메일 토큰 생성
        String emailToken = jwtUtil.generateToken(null, null, new Date(new Date().getTime() + 1000 * 60 * 5));
        //인즈용 링크 생성
        String href = "http://localhost:8080/api/auth/email?username=" + username + "&token=" + emailToken;

        //이메일 제목 및 내용 (HTML형식)
        final String SUBJECT = "[board_project] 계정 활성화 인증 메일입니다.";
        String content = String.format("""
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <h1>계정 활성화</h1>
                <p>계정 활성화를 하시려면 아래의 인증 버튼을 클릭하세요.</p>
                <a style="box-sizing: border-box; border: none; border-radius: 8px; padding: 7px 15px; background-color: #2383e2; color: #ffffff; text-decoration: none;" target="_blank" href="%s">인증하기</a>
              </div>
            </body>
            </html>
        """, href);

        sendMail(to, SUBJECT, content); //이메일 발송
    }


    //이메일 발송 메서드
    //@Value("${spring.mail.username}") => FROM_EMAIL로 대체
    public void sendMail(String to, String subject, String content) throws MessagingException {
        //MimeMessage객체는 이메일 전송에 사용되는 정보를 나타낸다.
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, StandardCharsets.UTF_8.name());
        mimeMessageHelper.setFrom(FROM_EMAIL); //발신자 설정
        mimeMessageHelper.setTo(to); //수신자 설정
        mimeMessageHelper.setSubject(subject); //제목 설정
        mimeMessage.setText(content, StandardCharsets.UTF_8.name(), "html"); //본문 내용 설정

        javaMailSender.send(mimeMessage); //이메일 전송
    }

    //이메일 인증 메서드
    @Transactional(rollbackFor = Exception.class)
    public String auth(String username, String token) {
        String responseMessage = "";
        try {
            //받은 토큰을 파싱하여 검증
            jwtUtil.parseToken(token);
            //사용자 이름을 통해 사용자 정보 조회
            Optional<User> userOptional = userRepository.findByUsername(username);

            if(userOptional.isEmpty()) {
                responseMessage = "[인증실패] 존재하지 않는 사용자입니다.";
            } else {
                User user = userOptional.get();
                if(user.getAccountEnabled() == 1) {
                    responseMessage = "[인증실패] 이미 인증된 사용자입니다.";
                } else {
                    userRepository.updateAccountEnabled(username);
                    responseMessage = "[인증성공] 인증에 성공하였습니다.";
                }
            }
        } catch (Exception e) {
            responseMessage = "[인증실패] 토큰이 유효하지 않거나 인증 시간을 초과하였습니다.";
        }

        return responseMessage;
    }

    //이메일 인증 코드 생성
    public String generateEmailCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(1000000));
    }

    //이메일 변경 메서드
    @Async
    public void sendChangeEmailVerification(String to, String code) throws MessagingException {
       //이메일 제목 및 내용 (HTML형식)
        String SUBJECT = "[board_project] 이메일 변경을 위한 사용자 인증 메일입니다.";
        String content = String.format("""
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <h1>이메일 인증</h1>
                <p>계정의 이메일 정보를 변경하려면 아래의 인증 코드 번호를 확인하세요.</p>
                <h3 style="background-color: #2383e2; color: #ffffff; margin: 20px 0;">%s</h3>
              </div>
            </body>
            </html>
        """, code);

        sendMail(to, SUBJECT, content); //이메일 발송
    }
}
