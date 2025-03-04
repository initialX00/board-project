package com.korit.boardback.repository;

import com.korit.boardback.entity.Board;
import com.korit.boardback.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepository {
    @Autowired
    private BoardMapper boardMapper;

    public Board save(Board board) {
        boardMapper.insertBoard(board);
        return board;
    }
}
