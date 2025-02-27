package com.korit.boardback.mapper;


import com.korit.boardback.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User selectById(int userId);
    User selectByUsername(String username);
    User selectByEmail(String email);

    int insert(User user);
    int updateProfileImgById(
            @Param("userId") int userId,
            @Param("profileImg") String profileImg);
    int updateNicknameById(
            @Param("userId") int userId,
            @Param("nickname") String nickname);
    int updatePasswordById(
            @Param("userId") int userId,
            @Param("password") String password);
    int updateAccountEnabledByUsername(
            @Param("username") String username);
}