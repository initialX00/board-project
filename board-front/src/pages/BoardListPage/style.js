import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1rem solid #dbdbdb;
    padding: 1rem;
`;

export const title = css`
    display: flex;

    & > h2 {
        margin: 0.5rem 0;
        font-size: 2rem;
    }
`;

export const searchItems = css`
    display: flex;
`;

export const searchInputBox = css`
    position: relative;
    margin-left: 1rem;
    height: 3rem;

    & > input {
        box-sizing: border-box;
        outline-color: #2684ff;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.4rem;
        padding: 0 4rem 0 1rem;
        width: 20rem;
        height: 100%;
        font-size: 1rem;
    }

    & > button {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 0;
    }
`;

export const main = css`
    padding: 1rem;
`;

export const boardListContainer = css`
    margin: 0;
    padding: 0;
    list-style-type: none; //리스트에서 점 없애기

    & > li:nth-of-type(1) {
        background-color: #fafafa;
    }

    & > li {
        display: flex;
        align-items: center;
        height: 3rem;
        cursor: default;

        &:not(:nth-of-type(1)):hover {
            border-radius: 0.7rem;
            background-color: #eeeeee;
            cursor: pointer;
        }

        & > div {
            box-sizing: border-box;
            font-size: 1.4rem;
        }
        & > div:not(& > div:nth-last-of-type(1)) {
            margin-right: 1rem;
            border-right: 0.1rem solid #dbdbdb;
        }
        & > div:nth-of-type(1) {
            padding-left: 1rem;
            width: 8rem;
        }
        & > div:nth-of-type(2) {
            flex-grow: 1;
            display: block;
            width: 13.4rem;
            padding-right: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //줄바꿈 없음
        }
        & > div:nth-of-type(3) {
            width: 15rem;
        }
        & > div:nth-of-type(4) {
            width: 5rem;
        }
        & > div:nth-of-type(5) {
            width: 10rem;
        }
    }
`;

export const boardWriter = css`
    display: flex;
    align-items: center;

    & > div {
        box-sizing: border-box;
        margin-right: 1rem;
        border: 0.1rem solid #dbdbdb;
        border-radius: 50%;
        width: 2.2rem;
        height: 2.2rem;
        overflow: hidden;

        & > img {
            width: 100%;
        }
    }

    & > span {
        display: block;
        width: 70%;
        padding-right: 1rem;
        margin-bottom: 0.1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

export const boardCounts = css`
    display: flex;


    & > span {
        position: relative;
        margin-right: 1rem;
        cursor: default;

        &:hover > span {
            display: block;
        }

        & span {
            display: none;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            z-index: 2;
            border-radius: 0.5rem;
            padding: 0.3rem 0.5rem;
            background-color: #000000c6;
            color: #ffffff;
            font-size: 1.4rem;
        }
    }
`;

export const footer = css`
    padding: 1rem;
`;

export const pageNumbers = css`
    display: flex;
    width: 25rem;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-right: 0.5rem;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        font-weight: 600;
        font-size: 1.2rem;
        cursor: pointer;

        &:hover {
            background-color: #fafafa;
        }

        & > span {
            margin-bottom: 0.1rem;
        }
    }
`;

export const pageNum = (isSelect) => css`
    background-color: ${isSelect ? "#eeeeee" : "#ffffff"};
`;