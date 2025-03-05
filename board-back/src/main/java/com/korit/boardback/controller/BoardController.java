package com.korit.boardback.controller;

import com.korit.boardback.dto.request.ReqBoardListSearchDto;
import com.korit.boardback.dto.request.ReqWriteBoardDto;
import com.korit.boardback.dto.response.RespBoardListSearchDto;
import com.korit.boardback.security.principal.PrincipalUser;
import com.korit.boardback.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/{categoryName}")
    public ResponseEntity<?> createBoard(
            @PathVariable String categoryName,
            @RequestBody ReqWriteBoardDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        return ResponseEntity.ok().body(boardService.createBoard(categoryName, principalUser.getUser(), dto));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok().body(boardService.getBoardCategoriesByUserId(principalUser.getUser()));
    }

    @GetMapping("/list")
    public ResponseEntity<?> searchBoardList(@ModelAttribute ReqBoardListSearchDto dto) {
        int totalBoardListCount = boardService.getBoardListCountBySearchText(dto.getSearchText());
        int totalPages = totalBoardListCount % dto.getLimitCount() == 0
                ? totalBoardListCount / dto.getLimitCount()
                : totalBoardListCount / dto.getLimitCount() + 1;

        RespBoardListSearchDto respBoardListSearchDto =
                RespBoardListSearchDto.builder()
                        .page(dto.getPage())
                        .limitCount(dto.getLimitCount())
                        .totalPages(totalPages)
                        .totalElements(totalBoardListCount)
                        .isFirstPage(dto.getPage() == 1)
                        .isLastPage(dto.getPage() == totalPages)
                        .boardSearchList(boardService.getBoardListSearchBySearchOption(dto))
                        .build();
        return ResponseEntity.ok().body(respBoardListSearchDto);
    }
}
