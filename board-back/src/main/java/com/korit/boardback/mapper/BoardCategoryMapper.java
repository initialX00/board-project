package com.korit.boardback.mapper;

import com.korit.boardback.entity.BoardCategory;
import com.korit.boardback.entity.BoardCategoryAndBoardCount;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardCategoryMapper {
    int insertBoardCategory(BoardCategory boardCategory);
    BoardCategory selectBoardCategoryByName(String boardCategoryName);
    List<BoardCategoryAndBoardCount> selectBoardCategoryAndBoardCountByUserId(int userId);
}
