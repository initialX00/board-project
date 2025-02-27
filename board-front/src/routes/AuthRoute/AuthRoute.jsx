import React, { useEffect } from 'react';
import LoginPage from '../../pages/LoginPage/LoginPage';
import JoinPage from '../../pages/JoinPage/JoinPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useUserMeQuery } from '../../queries/userQuery';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);


    useEffect(() => {
        console.log(queryState);
        if(queryState.status === "success") {
            navigate("/"); //정상접속 시 메인페이지로 보내기
        }
    }, [queryState]);

    /*
        data: {data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
        dataUpdateCount: 1
        dataUpdatedAt: 1740635043190
        error: null
        errorUpdateCount: 0
        errorUpdatedAt: 0
        fetchFailureCount: 0
        fetchFailureReason: null
        fetchMeta: null
        fetchStatus: "idle"
        isInvalidated: false
        status: "success"
    */
    
    //const loginUser = useUserMeQuery();
    // useEffect(() => {
    //     if(!loginUser.isError) { //정상접속 시 메인페이지로 보내기
    //         navigate("/");
    //     }
    // })

    return queryState.status === "error" &&
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>

}

export default AuthRoute;