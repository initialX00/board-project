package com.korit.boardback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync //비동기(큐) 처리 - 메일 송수신 시간이 걸리기때문에 비동기로 뛰어넘는다
public class AsyncConfig {
}
