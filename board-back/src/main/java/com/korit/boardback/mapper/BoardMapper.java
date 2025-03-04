package com.korit.boardback.mapper;

import com.korit.boardback.entity.Board;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    int insertBoard(Board board);
}
