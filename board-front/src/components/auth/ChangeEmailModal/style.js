import { css } from "@emotion/react";

export const modalTop = css`
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    & > div {
        cursor: pointer;
        & > svg {
            fill: #bbbbbb;
            &:hover {
                fill: #999999;
            }
        }
    }
`;

export const header = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 5rem;
`;

export const headerIcon = css`
    font-size: 3rem;
    & path {
        fill: #999999;
    }
`;

export const headerTitle = css`
    margin: 0.5rem;
    font-size: 1.6rem;
`;

export const headerMessage = css`
    text-align: center;
`;

export const inputGroup = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & > label {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    & > input {
        box-sizing: border-box;
        outline: none;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
        color: #666666;
        background-color: #fafafa;
    }
`;

export const verifyInput = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & > input {
        margin: 0 0.5rem;
        width: 2rem;
        height: 2rem;
        text-align: center;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

export const emailInputAndSendButton = css`
    display: flex;
    align-items: center;

    & > input {
        box-sizing: border-box;
        outline: none;
        margin-right: 1rem;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        flex-grow: 1;
        font-size: 1.4rem;
        color: #666666;
        background-color: #fafafa;
    }

    & > span {
        margin-right: 1rem;
        margin-bottom: 0.5rem;
        font-size: 1.4rem;
        cursor: default;
    }

    & > button { 
        box-sizing: border-box;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1.5rem;
        background-color: #2383e2;
        color: #ffffff;
        cursor: pointer;

        &:active {
            background-color: #1b65af;
        }

        &:disabled {
            background-color: #eeeeee;
            cursor: default;
        }
    }
`;

export const setButton = css`
    box-sizing: border-box;
    margin-top: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.8rem 2rem;
    width: 100%;
    background-color: #2383e2;
    color: #ffffff;
    cursor: pointer;

    &:active {
        background-color: #1b65af;
    }

    &:disabled {
        background-color: #eeeeee;
        cursor: default;
    }
`;