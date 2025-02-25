package com.korit.boardback.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "로그인 정보 DTO")
public class ReqLoginDto {
    @Schema(description = "사용자이름", example = "test12345")
    private String username;
    @Schema(description = "패스워드", example = "1234qwer")
    private String password;
}
