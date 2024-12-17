import { style } from "framer-motion/client";
import styled, { css } from "styled-components";

interface IProps {
    loading?: "loading" | "no_loading";
}

export const Container = styled.div<IProps>`
    min-width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    
    padding: 20px 14px;

    color: #f8f8f8;

    section {

        display: ${props => props.loading === "loading" ? "none" : "grid"};

        grid-template-columns: 1fr;
        grid-gap: 15px;

        width: 100%;
        max-width: 400px;

        padding: 18px 14px;

        background-color: var(--semiDarkNavy);

        span {
            font-weight: 500;
        }

        p {
            margin-top: 4px; 
            font-size: .9rem;
        }
        
    }

    @media (max-width: 450px) {
        justify-content: start;
    }
`;

export const StartingData = styled.div`

    width: 100%;
    max-width: 100%;
    min-width: 100%;

    margin-top: 20px;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 12px;

        h2 {
            font-size: 1.2rem;
            font-weight: 500;
        }

        button {
            margin-left: 10px;
            padding: 5px 8px;

            border: none;
            border-radius: 2px;

            color: var(--darkNavy);
            font-weight: 700;

            background-color: var(--lightYallow);
        }
    }
    

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        background-color: var(--semiNavy);

        li {

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            padding: 5px 8px;

            border: 1px solid #090909;

        }
    }

    @media (max-width: 380px) {
        div {
            flex-direction: column;
            align-items: baseline;


            button {
                margin: 0;
                margin-top: 10px;
            }
        }
    }
`;

export const Back = styled.div`
    width: 100%;
    max-width: 400px;

    margin-bottom: 15px;

    p {
        position: relative;

        padding: 2px 6px;

        font-size: 1.17rem;

        cursor: pointer;

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;

            width: 0%;
            height: 1px;
            background-color: #f8f8f8;

            transition: all .2s ease;
        }

        &:hover::before {
            width: 100%;
            left: 0;
        }
    }
`;


export const Loading = styled.div<IProps>`
    display: ${props => props.loading === "loading" ? "flex" : "none"};

    width: 100%;
    max-width: 400px;
    height: 300px;

    @keyframes loading {

        0% {
            background-position: 0%;
        }

        50% {
            background-position: 100%;
        }

        100% {
            background-position: 0%;
        }

    }

    background: transparent;
    background-image: linear-gradient(45deg, transparent, #c3c3c3, transparent);
    background-size: 400%;
    animation: loading 1s linear infinite;
`;