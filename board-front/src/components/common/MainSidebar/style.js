import { css } from "@emotion/react";

export const layout = (isOpen) => css`
    position: relative;
    transition: all 0.5s ease-in-out;
    box-sizing: border-box;

    width: ${isOpen ? "30rem" : "0rem"};
    height: 100%;

    background-color: #f8f8f5;
`;

export const container = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    right: 0;
    box-sizing: border-box;
    padding: 0.6rem;
    width: 30rem;
    height: 100%;
`;

export const groupLayout = css`
    position: relative;
    box-sizing: border-box;
    border-radius: 0.7rem;
    padding: 0.6rem;
    width: 100%;
    cursor: pointer;

    &:hover {
        background-color: #00000017;
    }
`;

export const topGroup = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const user = css`
    display: flex;
    font-size: 1.6rem;
`;

export const profileImgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    border-radius: 0.5rem;
    width: 3rem;
    height: 3rem;
    background-color: #ffffff;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

export const authText = css`
    display: inline-flex;
    align-items: center;
    width: 20rem;

    & > svg {
        margin-right: 0.5rem;
    }
    & > span {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis; //텍스트 오버플로우 ...으로 처리
        white-space: nowrap; //줄바꿈 안함
        text-align: start;
    }
`;

export const categoryText = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const writeButton = css`
    position: absolute;
    right: 0.6rem;
    top: 0.4rem;
`;

export const categoryListContainer = css`
    flex-grow: 1;
    overflow-y: auto;
`;

export const categoryItem = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & > button:nth-of-type(2) {
        opacity: 0;
    }

    &:hover > button:nth-of-type(2) { //버튼 올렸을때만 활성화
        opacity: 1;
    }
`;