package com.korit.boardback.repository;

import com.korit.boardback.entity.Board;
import com.korit.boardback.entity.BoardSearch;
import com.korit.boardback.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.OptionalInt;


@Repository
public class BoardRepository {
    @Autowired
    private BoardMapper boardMapper;

    public Board save(Board board) {
        boardMapper.insertBoard(board);
        return board;
    }

    public List<BoardSearch> findBoardListAllBySearchOption(
            int startIndex, int limitSize, String order, String searchText
    ) {
        return boardMapper.selectBoardListAllBySearchOption(startIndex, limitSize, order, searchText);
    }

    public int findBoardCountAllBySearchText(String searchText) {
        return boardMapper.selectBoardCountAllBySearchText(searchText);
    }
}
