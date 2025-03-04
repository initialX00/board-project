package com.korit.boardback.repository;

import com.korit.boardback.entity.BoardCategory;
import com.korit.boardback.entity.BoardCategoryAndBoardCount;
import com.korit.boardback.mapper.BoardCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardCategoryRepository {

    @Autowired
    private BoardCategoryMapper boardCategoryMapper;

    public BoardCategory save(BoardCategory boardCategory) {
        boardCategoryMapper.insertBoardCategory(boardCategory);
        return boardCategory;
    }

    public Optional<BoardCategory> findByName(String name) {
        return Optional.ofNullable(boardCategoryMapper.selectBoardCategoryByName(name));
    }

    public List<BoardCategoryAndBoardCount> findAllByUserId(int userId) {
        return boardCategoryMapper.selectBoardCategoryAndBoardCountByUserId(userId);
    }
}
