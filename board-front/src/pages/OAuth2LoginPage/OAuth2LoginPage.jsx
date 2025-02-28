import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';

function OAuth2LoginPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ searchParams ] = useSearchParams(); //주소창의 값 들고오기
    

    const setAccessToken = async () => { //주소창에 띄워진 엑세스토큰 가져오기
        const accessToken = searchParams.get("accessToken");
        setTokenLocalStorage("AccessToken", accessToken);
        await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});
        navigate("/");
    };

    useEffect(() => {
        setAccessToken();
    }, []);

    return <></>
}

export default OAuth2LoginPage;