/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useInputValid } from '../../hooks/validInputHook';
import { useJoinMutation } from '../../mutations/authMutation';

function JoinPage(props) {
    const navigate = useNavigate();
    const joinMutation = useJoinMutation(); 

    const [ inputValue, setInputValue ] = useState({
        username: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const [ inputValidError, setInputValidError ] = useState({
        username: false,
        email: false,
        password: false,
        passwordCheck: false,
    });

    const handleInputOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }


    const isErrors = () => {
        const isEmpty = Object.values(inputValue).map(value => !!value).includes(false);
        const isValid = Object.values(inputValidError).includes(true);
        return isEmpty || isValid;
    }

    const handlePasswordFocus = () => {
        setInputValue(prev => ({
            ...prev,
            password: "",
            passwordCheck: "",
        }));
    }

    

    const handleJoinOnClick = () => {
        if(isErrors()) {
            alert("가입 정보를 다시 확인해주세요");
            return;
        }

        joinMutation.mutateAsync({
            username: inputValue.username, 
            email: inputValue.email,
            password: inputValue.password,
        }).then(response => {
            //console.log(response);
            alert("가입을 환영합니다");
            navigate(`/auth/login ? username=${response.data.username}`)
        }).catch(error => {
            if(error.status === 400) {
                setInputValidError(prev => ({
                    ...prev,
                    username: true,
                }));
                //console.log(joinMutation.error);
            }
        });
 
        
        console.log(joinMutation.error);
        
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
                        <ValidInput type={"text"} placeholder={"Enter your username"} 
                            name={"username"}
                            value={inputValue.username}
                            onChange={handleInputOnChange}
                            regexp={/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/}
                            errorMessage={"사용할 수 없는 사용자이름입니다"} 
                            inputValidError={inputValidError}
                            setinputValidError={setInputValidError} />
                        <ValidInput type={"text"} placeholder={"Enter your email"} 
                            name={"email"}
                            value={inputValue.email}
                            onChange={handleInputOnChange}
                            regexp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                            errorMessage={"사용할 수 없는 이메일입니다"} 
                            inputValidError={inputValidError}
                            setinputValidError={setInputValidError} />
                        <ValidInput type={"password"} placeholder={"Enter your password"} 
                            name={"password"}
                            value={inputValue.password}
                            onChange={handleInputOnChange}
                            onFocus={handlePasswordFocus}
                            regexp={/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]|\\:;\"'<>,.?/-]{8,20}$/}
                            errorMessage={"비밀번호는 8자이상 16자이하로 영문,숫자의 조합이여야합니다"} 
                            inputValidError={inputValidError}
                            setinputValidError={setInputValidError} />
                        <ValidInput type={"password"} placeholder={"Check your password"} 
                            name={"passwordCheck"}
                            value={inputValue.passwordCheck}
                            onChange={handleInputOnChange}
                            regexp={new RegExp(`^${inputValue.password}$`)}
                            errorMessage={"패스워드가 일치하지 않습니다"} 
                            inputValidError={inputValidError}
                            setinputValidError={setInputValidError} />

                        <p css={s.accountMessage}>
                            계정이 이미 있으신가요? <Link to={"/auth/login"}>로그인</Link>
                        </p>
                        <div css={s.groupBox}>
                            <button css={s.accountButton} onClick={handleJoinOnClick}>Join</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default JoinPage;


/*

function JoinPage(props) {
    const joinMutation = useJoinMutation();

    const usernameInputData = useInputValid({
        regexp: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
        errorText: "사용할 수 없는 사용자이름입니다", 
    });
    const emailInputData = useInputValid({
        regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorText: "사용할 수 없는 이메일입니다", 
    });
    const passwordInputData = useInputValid({
        regexp: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]|\\:;\"'<>,.?/-]{8,20}$/,
        errorText: "비밀번호는 8자이상 16자이하로 영문,숫자의 조합이여야합니다", 
    });
    const passwordCheckInputData = useInputValid({
        regexp: new RegExp(`^${passwordInputData.value}$`),
        errorText: "패스워드가 일치하지 않습니다", 
    });

    const isErrors = () => {
        const errors = [
            !usernameInputData.value,
            !emailInputData.value,
            !passwordInputData.value,
            !passwordCheckInputData.value,
            !!usernameInputData.errorMessage,
            !!emailInputData.errorMessage,
            !!passwordInputData.errorMessage,
            !!passwordCheckInputData.errorMessage,
        ];
        return errors.includes(true);
    }

    

    const handleJoinOnClick = () => {
        if(isErrors()) {
            alert("가입 정보를 다시 확인해주세요");
            return;
        }

        joinMutation.mutate({
            username: usernameInputData.value, 
            email: emailInputData.value,
            password: passwordInputData.value
        });
 
        if(joinMutation.isError) {
            console.log(joinMutation.error);
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
                        <ValidInput type={"text"} placeholder={"Enter your username"} 
                            name={"username"}
                            value={usernameInputData.value}
                            onChange={usernameInputData.handleOnChange}
                            onBlur={usernameInputData.handleOnBlur}
                            errorMessage={usernameInputData.errorMessage}/>
                        <ValidInput type={"text"} placeholder={"Enter your email address..."} 
                            name={"email"}
                            value={emailInputData.value}
                            onChange={emailInputData.handleOnChange}
                            onBlur={emailInputData.handleOnBlur}
                            errorMessage={emailInputData.errorMessage}/>
                        <ValidInput type={"password"} placeholder={"Enter your password..."} 
                            name={"password"}
                            value={passwordInputData.value}
                            onChange={passwordInputData.handleOnChange}
                            onBlur={passwordInputData.handleOnBlur}
                            errorMessage={passwordInputData.errorMessage}/>
                        <ValidInput type={"password"} placeholder={"Check your password..."} 
                            name={"passwordCheck"}
                            value={passwordCheckInputData.value}
                            onChange={passwordCheckInputData.handleOnChange}
                            onBlur={passwordCheckInputData.handleOnBlur}
                            errorMessage={passwordCheckInputData.errorMessage}/>

                        <p css={s.accountMessage}>
                            계정이 이미 있으신가요? <Link to={"/auth/login"}>로그인</Link>
                        </p>
                        <div css={s.groupBox}>
                            <button css={s.accountButton} onClick={handleJoinOnClick}>Join</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

 */