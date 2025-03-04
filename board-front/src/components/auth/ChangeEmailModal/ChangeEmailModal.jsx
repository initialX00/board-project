/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import Swal from 'sweetalert2';
import { useSendVerifyEamilMutaion, useUpdateEmailMutation } from '../../../mutations/accountMutation';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

function ChangeEmailModal({ setOpen }) {
    const quryClient = useQueryClient();
    const updateEmailMutation = useUpdateEmailMutation();
    const verifyEmailMutation = useSendVerifyEamilMutaion();
    const [ emailValue, setEmailValue ] = useState("");
    const [ time, setTime ] = useState(60 * 5);
    const [ isSend, setSend ] = useState(false);
    const [ verifyInputValue, setVerifyInputValue ] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
    });

    const [ verifyCode, setVerifyCode ] = useState("");

    useEffect(() => {
        const timer = setinterval(() => { //1초마다 1초 감소
            setTime(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [isSend]);

    useEffect(() => { //타이머 0일시 정지
        if(time === 0) {
            Swal.fire({
                showConfirmButton: true,
                confirmButtonText: "확인",
                titleText: "인증 시간이 만료되었습니다.",
            }).then(() => {
                setOpen(false);
            })
        }
    }, [time]);

    const handleEmailInputOnChange = (e) => {
        setEmailValue(e.target.value);
    }
    
    const handleSendMailOnClick = async () => {
        setTime(60 * 5); //새전송 시 마다 5분으로 초기화
        setSend(true);
        const response = await verifyEmailMutation.mutateAsync(emailValue);
        //console.log(response.data);
        setVerifyCode(response.data.toString().padStart(6, '0'));
    }
    const handleVerifyInputOnChange = (e) => {
        setVerifyInputValue(prev => {
            if(/^[0-9]?$/.test(e.target.value)) {
                return {
                    ...prev,
                    [e.target.name]: e.target.value,
                }
            }
            return {
                ...prev
            }
        })
    }

    const handleSetButtonOnClick = async () => {
        const inputCode = 
            verifyInputValue.first
            + verifyInputValue.second
            + verifyInputValue.third
            + verifyInputValue.fourth
            + verifyInputValue.fifth
            + verifyInputValue.sixth;

        if(verifyCode.toString() !== inputCode) {
            await Swal.fire({
                titleText: "인증번호가 일치하지 않습니다",
                confirmButtonText: "확인",
                confirmButtonColor: "#d02121",
            });
            return;
        }
        await updateEmailMutation.mutateAsync(emailValue);
        await Swal.fire({
            titleText: "이메일 변경 완료",
            confirmButtonText: "확인"
        });
        await quryClient.invalidateQueries({queryKey: ["userMeQuery"]});
        setOpen(false);
    }

    const handleCloseButtonOnClick = () => {
        setOpen(false);
    } 

    return (
        <div>
            <div css={s.modalTop}>
                <div onClick={handleCloseButtonOnClick}><RiCloseCircleFill /></div>
            </div>
            <div css={s.header}>
                <div css={s.headerIcon}><CgMail /></div>
                <h2 css={s.headerTitle}>Set a email address</h2>
                <p css={s.headerMessage}>변경할 이메일 주소를 입력하세요. 이후 인증 절차를 통해 이메일 변경이 가능합니다.</p>
            </div>
            <div>
                <div css={s.inputGroup}>
                    <label>Enter a new email</label>
                    <div css={s.emailInputAndSendButton}>
                        <input type="email" name='newEmail' 
                            disabled={isSend}
                            value={emailValue}
                            onChange={handleEmailInputOnChange} />
                        {
                            isSend
                            ?
                            <span>{Math.floor(time / 60).toString().padStart(2,'0')}
                                :{(time % 60).toString().padStart(2,'0')}</span> //pad : 문자열 길이 2개, 빈공간은 0으로 채운다
                            :
                            <button onClick={handleSendMailOnClick}>전송</button>
                        }
                    </div>
                </div>
                {
                    isSend &&
                    <div css={s.inputGroup}>
                        <div css={s.verifyInput}>
                            <input type="number" name='first' value={verifyInputValue.first} onChange={handleVerifyInputOnChange} />
                            <input type="number" name='second' value={verifyInputValue.second} onChange={handleVerifyInputOnChange} />
                            <input type="number" name='third' value={verifyInputValue.third} onChange={handleVerifyInputOnChange} />
                            <input type="number" name='fourth' value={verifyInputValue.fourth} onChange={handleVerifyInputOnChange} />
                            <input type="number" name='fifth' value={verifyInputValue.fifth} onChange={handleVerifyInputOnChange} />
                            <input type="number" name='sixth' value={verifyInputValue.sixth} onChange={handleVerifyInputOnChange} />
                        </div>
                    </div>
                }
                <button 
                    css={s.setButton} 
                    disabled={!emailValue || Object.values(verifyInputValue).includes("")}
                    onClick={handleSetButtonOnClick}
                >Set a email address</button>
            </div>
        </div>
    );
}

export default ChangeEmailModal;