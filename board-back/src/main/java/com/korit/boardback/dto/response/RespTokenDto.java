package com.korit.boardback.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RespTokenDto {
    private String type;
    private String name;
    private String token;
}
