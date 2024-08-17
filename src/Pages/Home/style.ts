import styled, { css } from "styled-components";

interface IField {
    player?: boolean;
}

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;

    padding: 0 15px 30px 15px;
    margin: 0 auto;

`;

export const ContainerBoard = styled.section`
    width: 100%;
    max-width: 340px;

    margin: 0 auto;
    margin-top: 40px;

`;

export const OptionMatch = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img {
        height: 25px;
        cursor: pointer;
    }


    button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 35px;
        height: 35px;
        border-bottom-width: 3px;

        border-radius: 8px;

        img {
            height: 15px;
            transition: all .5s ease-in-out;
        }

        &:hover {
            img {
                transform: rotate(360deg);
            }
        }

    }
    
`;

export const Turn = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    
    padding: 10px 21px;

    border-radius: 10px;
    border-bottom: 3px solid #10212a;

    font-size: 13px;
    font-weight: 700;
    color: var(--silver);

    background-color: var(--semiDarkNavy);

    cursor: pointer;

    img {
        height: 15px;
        margin-right: 10px;

        transition: scale .4s ease;
    }

    &:hover {
        img {
            scale: 1.2;
        }
    }

    
`;

export const Board = styled.article`
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;

        width: 100%;
    }
    
    @media (max-width: 400px) {
        ul {
            grid-gap: 14px;
        }
    }

`;

export const Field = styled.li<IField>`
    display: grid;

    align-items: center;
    justify-items: center;

    width: 100%;
    aspect-ratio: 1 / 1;

    border-radius: 15px;
    border-bottom: 4px solid #10212a;

    background-color: var(--semiDarkNavy);

    ${props => props.player ? css`
        cursor: pointer;

        img {
            opacity: 0;
            transition: opacity .4s ease;
        }

        &:hover {
            img {
                opacity: 1;
            }

        }

    ` : css`
        cursor: default;
    `}

    img {
        width: 50%;
        height: fit-content;

    }

    @media (max-width: 400px) {
        border-radius: 10px;
    }
`;

export const Scoreboard = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    width: 100%;
    margin-top: 19px;

    strong {
        font-size: 18px;
        font-weight: 700;

        transition: scale .2s ease;
    }

    button {
        display: grid;
        grid-template-columns: 1fr;

        padding: 13px;

        font-size: 12px;
        font-weight: 400;

        cursor: default;

        &:hover {

            strong {
                scale: 1.2;
            }
        }
    }
`;
