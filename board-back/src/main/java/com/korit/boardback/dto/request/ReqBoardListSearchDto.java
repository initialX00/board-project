package com.korit.boardback.dto.request;

import lombok.Data;

@Data
public class ReqBoardListSearchDto {
    private int page;
    private int limitCount;
    private String order;
    private String searchText;
}
