/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginMutation, useSendAuthMailMutation } from '../../mutations/authMutation';
import Swal from 'sweetalert2';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';

function LoginPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginMutation = useLoginMutation();
    const sendAuthMailMutation = useSendAuthMailMutation();

    const [ searchParams, setSearchParams ] = useSearchParams();
    //console.log(searchParams.get("username"));

    const [ inputValue, setInputValue ] = useState({
        username: searchParams.get("username") || "",
        password: ""
    }); 

    const handleInputOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }


    const handleLoginOnClick = async () => {
        try {
            const response = await loginMutation.mutateAsync(inputValue);
            const tokenName = response.data.name;
            const accessToken = response.data.token;
            setTokenLocalStorage(tokenName, accessToken);
            //console.log(response.data);
            await Swal.fire({ //Swal : 알럿창 스타일인터페이스
                position: "center",
                icon: "success",
                title: "로그인 성공",
                showConfirmButton: false,
                timer: 1000,
                //target:  원하는 레이어 안에 띄우기 
            });
            //invalidate는 캐쉬를 unrefresh하게 한다
            await queryClient.invalidateQueries({queryKey: ["userMeQuery"]}); //promise여서 await가능
            navigate("/"); //awiat이 아닐경우 비동기로 동작하면서 로그인 시 로그인페이지 -> 홈 -> 로그인페이지로 이동하게된다
        } catch(error) {
            if(error.response.status === 401) {
                const result = await Swal.fire({
                    title: '계정 활성화',
                    text: '계정을 활성화 하려면 등록하신 메일을 통해 계정 인증을 하세요. 다시 메일 전송이 필요하면 전송버튼을 클릭하세요.',
                    confirmButtonText: '전송',
                    confirmButtonColor: "#2389e2",
                    showCancelButton: true,
                    cancelButtonText: '취소',
                    cancelButtonColor: "#999999",
                });

                if(result.isConfirmed) {
                    //메일 전송 시 오류가 날 수 있으므로 동기 실행, 비동기이면 응답을 나중에 받기에 실패해도 성공이라 뜨게될것
                    await sendAuthMailMutation.mutateAsync(inputValue.username);
                    await Swal.fire({
                        title: '메일 전송 완료',
                        confirmButtonText: '확인',
                        confirmButtonColor: "#2389e2"
                    });
                }

            } else {
                await Swal.fire({
                    title: '로그인 실패',
                    text: '사용자 정보를 다시 확인해주세요.',
                    confirmButtonText: '확인',
                    confirmButtonColor: "#e22323"
                });
            }
        }
    }

    const handleOAuth2LoginOnClick = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    }



    return (
        <div css={s.layout}>
            <div>
                <header>
                    <h1 css={s.title1}>Think it. Make it.</h1>
                    <h1 css={s.title2}>Log in to your Board account</h1>
                </header>
                <main>
                    <div css={s.oauth2Group}>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button} onClick={() => handleOAuth2LoginOnClick("google")}>
                                <div css={s.oauth2Icon}><SiGoogle /></div>
                                <span css={s.oauth2Text}>Continue with Google</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button} onClick={() => handleOAuth2LoginOnClick("naver")}>
                                <div css={s.oauth2Icon}><SiNaver /></div>
                                <span css={s.oauth2Text}>Continue with Naver</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiKakao /></div>
                                <span css={s.oauth2Text}>Continue with Kakao</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div css={s.groupBox}>
                            <input css={s.textInput} type="text" placeholder='Enter your username...'
                                name="username"
                                value={inputValue.username}
                                onChange={handleInputOnChange}
                            />
                        </div>
                        <div css={s.groupBox}>
                            <input css={s.textInput} type="password" placeholder='password...'
                                name="password"
                                value={inputValue.password}
                                onChange={handleInputOnChange}
                            />
                        </div>
                        <p css={s.accountMessage}>
                            계정이 없으시다면 지금 가입하세요. <Link to={"/auth/join"}>회원가입</Link>
                        </p>
                        <div css={s.groupBox}>
                            <button css={s.accountButton} onClick={handleLoginOnClick}>Login</button>
                        </div>
                    </div>
                </main>
                <footer>
                    <p css={s.footerAgreement}>
                        이메일을 사용하여 계정을 구분하고 다른 사용자들에게 게시글을 공유합니다.
                        계속 진행하려면 약관 및 개인정보 보호정책을 이해하고 동의한다는 것을 인정해야합니다.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default LoginPage;