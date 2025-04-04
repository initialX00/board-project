package com.korit.boardback.mapper;

import com.korit.boardback.entity.Board;
import com.korit.boardback.entity.BoardSearch;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insertBoard(Board board);
    List<BoardSearch> selectBoardListAllBySearchOption(
            @Param("startIndex") int startIndex,
            @Param("limitCount") int limitCount,
            @Param("order") String order,
            @Param("searchText") String searchText
    );
    int selectBoardCountAllBySearchText(@Param("searchText") String searchText);
    List<BoardSearch> selectBoardListAllByUserIdAndCategoryNameAndSearchOption(
            @Param("userId") int userId,
            @Param("categoryName") String categoryName,
            @Param("startIndex") int startIndex,
            @Param("limitCount") int limitCount
    );
    int selectBoardCategoryCountAllByUserIdAndCategoryName(
            @Param("userId") int userId,
            @Param("categoryName") String categoryName
    );
}