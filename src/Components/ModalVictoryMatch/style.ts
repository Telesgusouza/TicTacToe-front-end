import styled, { css } from "styled-components";

interface IProps {
    victory: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW";
}

export const Container = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;

    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 20px 0;

    overflow-y: scroll;

    background-color: rgba(0, 0, 0, .4);


    div:nth-child(1) {
        width: 100%;
    }
`;

export const ContainerContent = styled.section<IProps>`
    
    width: 100%;
    padding: 24px 20px;

    text-align: center;

    background-color: var(--semiDarkNavy);

    article, div {
        display: flex;
        justify-content: center;
        align-items: center;

        width: fit-content;
    }

    article {
        width: fit-content;
        flex-direction: column;;

        width: fit-content;
        margin: 0 auto;
    }

    span {
        font-size: 10px;
        font-weight: 700;
        color: var(--silver);
    }


    div {
        flex-direction: row;
        
        &:nth-child(2) {

        }

        &:nth-child(3) {
            display: flex;
            flex-direction: row;

        }

        strong {
                font-size: 28px;
                font-weight: 700;

                ${props => props.victory === "DRAW" ?
        css`
                    color: var(--silver);
                ` : css`
                    color: var(${props.victory === "PLAYER_ONE" ? "--lightYallow" : "--lightBlue"});
                `}


            }
    }


    button {
        width: fit-content;

        font-size: 14px;
        padding: 10px 15px;
        border-radius: 12px;

        &:nth-child(1) {
            margin-right: 16px;
        }
    } 
`;

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;

    margin-top: 16px;
    margin: 16px 0 24px 0;

    img {
        width: 50px;
        margin-right: 24px;
    }

    @media (max-width: 340px) {
        img {
            width: 45px;
            margin-right: 8px;
        }
    }
`;