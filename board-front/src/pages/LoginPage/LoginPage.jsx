/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginMutation } from '../../mutations/authMutation';
import Swal from 'sweetalert2';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useUserMeQuery } from '../../queries/userQuery';
import { useQueryClient } from '@tanstack/react-query';

function LoginPage(props) {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    const queryClient = useQueryClient();

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
                //원하는 레이어 안에 띄우기 target: 
            });
            //invalidate는 캐쉬를 unrefresh하게 한다
            await queryClient.invalidateQueries({queryKey: ["userMeQuery"]}) //promise여서 await가능
            navigate("/"); //awiat이 아닐경우 비동기로 동작하면서 로그인 시 로그인페이지 -> 홈 -> 로그인페이지로 이동하게된다
        } catch(error) {
            await Swal.fire({ //promise라서 비동기이다
                title: '로그인실패',
                text: '사용자 정보를 다시 확인해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: "#e22323",
            });
        }
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
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiGoogle /></div>
                                <span css={s.oauth2Text}>Continue with Google</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
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