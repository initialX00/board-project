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
        // @ModelAttribute는 요청 파라미터를 해당 객체에 자동으로 바인딩합니다.
        // 예를 들어, 클라이언트가 'page=1&limitCount=10&searchText=keyword' 와 같은 쿼리 파라미터를 보내면
        // 그 값들이 자동으로 ReqBoardListSearchDto 객체의 속성으로 설정됩니다.

        int totalBoardListCount = boardService.getBoardListCountBySearchText(dto.getSearchText());
        int totalPages = totalBoardListCount % dto.getLimitCount() == 0
                ? totalBoardListCount / dto.getLimitCount()
                : totalBoardListCount / dto.getLimitCount() + 1;

        // RespBoardListSearchDto는 클라이언트에게 전달할 응답 데이터 구조입니다.
        // builder()를 사용해 객체를 생성하고 필요한 값들을 세팅합니다.
        RespBoardListSearchDto respBoardListSearchDto =
                RespBoardListSearchDto.builder()
                        .page(dto.getPage()) // 현재 페이지 번호
                        .limitCount(dto.getLimitCount())  // 한 페이지에 표시할 게시글 수
                        .totalPages(totalPages)  // 전체 페이지 수
                        .totalElements(totalBoardListCount)  // 전체 게시글 수
                        .isFirstPage(dto.getPage() == 1)  // 현재 페이지가 첫 번째 페이지인지 여부 (1페이지라면 true)
                        .isLastPage(dto.getPage() == totalPages)  // 현재 페이지가 마지막 페이지인지 여부
                        .nextPage(dto.getPage() != totalPages ? dto.getPage() + 1 : 0)  // 다음 페이지 번호. 마지막 페이지라면 0을 반환
                        .boardSearchList(boardService.getBoardListSearchBySearchOption(dto))  // 실제 게시글 목록을 가져옴
                        .build();
        return ResponseEntity.ok().body(respBoardListSearchDto);
    }

    @GetMapping("/{category}/list")
    public ResponseEntity<?> searchBoardCategoryList(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @PathVariable String category,
            @ModelAttribute ReqBoardListSearchDto dto
    ) {
        int totalBoardListCount = boardService.getBoardCategoryCountByUserIdAndCategoryName(principalUser.getUser(), category);
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
                        .nextPage(dto.getPage() != totalPages ? dto.getPage() + 1 : 0)
                        .boardSearchList(boardService.getBoardCategoryList(principalUser.getUser(), category, dto))
                        .build();
        return ResponseEntity.ok().body(respBoardListSearchDto);
    }
}
