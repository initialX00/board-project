import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 4rem;


    & > h1 {
        color: #d02121;
        font-size: 3rem;
        cursor: default;
    }

    & > p {
        font-size: 2rem;
        cursor: default;
    }
`;