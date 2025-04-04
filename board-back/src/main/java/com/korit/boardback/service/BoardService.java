package com.korit.boardback.service;

import com.korit.boardback.dto.request.ReqBoardListSearchDto;
import com.korit.boardback.dto.request.ReqWriteBoardDto;
import com.korit.boardback.entity.*;
import com.korit.boardback.repository.BoardCategoryRepository;
import com.korit.boardback.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardCategoryRepository boardCategoryRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Transactional(rollbackFor = Exception.class)
    public Board createBoard(String categoryName, User user, ReqWriteBoardDto reqWriteBoardDto) {
        BoardCategory boardCategory = boardCategoryRepository
                .findByName(categoryName)
                .orElseGet(() -> {
                    BoardCategory bc = BoardCategory.builder()
                            .boardCategoryName(categoryName)
                            .build();
                    return boardCategoryRepository.save(bc);
                });

        Board board = Board.builder()
                .boardCategoryId(boardCategory.getBoardCategoryId())
                .userId(user.getUserId())
                .title(reqWriteBoardDto.getTitle())
                .content(reqWriteBoardDto.getContent())
                .build();
        return boardRepository.save(board);
    }

    public List<BoardCategoryAndBoardCount> getBoardCategoriesByUserId(User user) {
        return boardCategoryRepository.findAllByUserId(user.getUserId());
    }

    @Transactional(readOnly = true) //읽기전용으로 최적화
    public List<BoardSearch> getBoardListSearchBySearchOption(ReqBoardListSearchDto reqBoardListSearchDto) {
        int startIndex = (reqBoardListSearchDto.getPage() - 1) * reqBoardListSearchDto.getLimitCount();
        return boardRepository.findBoardListAllBySearchOption(
                startIndex,
                reqBoardListSearchDto.getLimitCount(),
                reqBoardListSearchDto.getOrder(),
                reqBoardListSearchDto.getSearchText()
        );
    }

    @Transactional(readOnly = true)
    public int getBoardListCountBySearchText(String searchText) {
        return boardRepository.findBoardCountAllBySearchText(searchText);
    }

    @Transactional(readOnly = true)
    public List<BoardSearch> getBoardCategoryList(User user, String categoryName, ReqBoardListSearchDto dto) {
        int startIndex = (dto.getPage() - 1) * dto.getLimitCount();
        return boardRepository
                .findBoardListAllByUserIdAndCategoryNameAndSearchOption(user.getUserId(), categoryName, startIndex, dto.getLimitCount());
    }

    @Transactional(readOnly = true)
    public int getBoardCategoryCountByUserIdAndCategoryName(User user, String categoryName) {
        return boardRepository.findBoardCategoryCountByUserIdAndCategoryName(user.getUserId(), categoryName);
    }
}
