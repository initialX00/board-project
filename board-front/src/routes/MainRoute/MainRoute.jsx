import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountPage from '../../pages/AccountPage/AccountPage';
import MainSidebar from '../../components/common/MainSidebar/MainSidebar';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import { useUserMeQuery } from '../../queries/userQuery';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useQueryClient } from '@tanstack/react-query';
import BoardWritePage from '../../pages/BoardWritePage/BoardWritePage';
import BoardListPage from '../../pages/BoardListPage/BoardListPage';
import CategoryBoardListPage from '../../pages/CategoryBoardListPage/CategoryBoardListPage';

function MainRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);

    useEffect (() => {
        //console.log(queryState);
        if(queryState.status === "error") {
            navigate("/auth/login"); //로그아웃 상태로 모든 경로 접근 시 로그인페이지로
        }
    }, [queryState]);

    // const loginUser = useUserMeQuery();
    // useEffect (() => {
    //     if(loginUser.isError) { //로그아웃 상태로 모든 경로 접근 시 로그인페이지로
    //         navigate("/auth/login");
    //     }
    // });

    return queryState.status === "success" &&
        <>
            <MainSidebar />
            <MainContainer>
                <Routes>
                    <Route path="/account/setting" element={<AccountPage />} />
                    <Route path="/board/list" element={<BoardListPage />} />
                    <Route path="/board/:categoryName/list" element={<CategoryBoardListPage />} />
                    <Route path="/board/write/:categoryName" element={<BoardWritePage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </MainContainer>
        </>
}

export default MainRoute;