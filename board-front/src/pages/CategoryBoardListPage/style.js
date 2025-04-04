import { css } from "@emotion/react";

export const scrollayout = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 62.5rem;
    overflow-y: auto;

`;

export const cardLayoutGroup = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
`;

export const cardLayout = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 1rem 0rem;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    width: 39.9rem;
    height: 15rem;
    cursor: pointer;

    &:nth-of-type(2n - 1) {
        margin-left: 2rem;
        margin-right: 1rem;
    } 
    &:nth-of-type(2n) {
        margin-left: 1rem;
        margin-right: 2rem;
    } 

    & > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 0.1rem solid #dbdbdb;
        padding: 1rem;
        height: 6rem;
    }

    & > main {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 1rem;
        flex-grow: 1;
    }

`;


export const headerLeft = css`
    display: flex;
    align-items: center;
`;

export const profileImgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 1rem;
    border: 0.1rem solid #dbdbdb;
    border-radius: 50%;
    width: 3.9rem;
    height: 3.9rem;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

export const boardTitle = css`
    margin: 0;
    font-size: 1.8rem;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const boardCounts = css`
    display: flex;


    & > span {
        position: relative;
        margin-right: 1rem;
        font-size: 1.8rem;
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