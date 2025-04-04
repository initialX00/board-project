package com.korit.boardback.dto.response;

import com.korit.boardback.entity.BoardSearch;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RespBoardListSearchDto {
    private int page;
    private int limitCount;
    private int totalPages;
    private int totalElements;
    private boolean isFirstPage;
    private boolean isLastPage;
    private int nextPage;
    private List<BoardSearch> boardSearchList;
}