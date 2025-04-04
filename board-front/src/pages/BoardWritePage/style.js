import { css } from "@emotion/react";

export const quillEditor = css`
    box-sizing: border-box;
    flex-grow: 1;
    height: 60rem;

    .ql-toolbar {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: none;
        border-bottom: 0.1rem solid #dbdbdb;
    }

    .ql-container {
        height: 85%;
        border: none;
    }
`;

export const quillTop = css`
    display: flex;

    & > input {
        box-sizing: border-box;
        flex-grow: 1;
        margin-right: 1rem;
        outline: none;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 0 1.5rem;
    }
`;

export const saveButton = css`
    box-sizing: border-box;
    margin-right: 1rem;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fafafa;
    cursor: pointer;
    &:hover {
        background-color: #eeeeee;
    }
    &:active {
        background-color: #dddddd;
    }
`;