import styled, { css } from "styled-components";

interface IProps {
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: "small" | "large";
    borderbottom: "" | "no_board";

    hoverstyle: "" | "no_hover_style";
}

export const Button = styled.button<IProps>`
    font-weight: 800;
    color: var(--darkNavy);

    border: none;
    border-radius: 15px;
    border-bottom-style: solid;
    border-bottom-width: ${props => props.option === "small" ? 7 : 4 }px;
    
    transition: background .14s ease;
    transition: border .14s ease;

    ${props => props.option ? css`
        font-size: 1.25rem;
        padding: 17px 25px;

    ` : css`
    
        font-size: 1rem;
        padding: 15px;

    `}


    ${props => props.btn === "BUTTON_BLUE" && css`
        border-bottom-color: #118c87;
        background-color: var(--lightBlue);

        ${
            props.hoverstyle === "" && css`
                &:hover {
                    background-color: var(--lightBlueHover);
                    border-bottom-color: var(--lightBlue);
                }            
            `
        }

    `}

    ${props => props.btn === "BUTTON_YALLOW" && css`
        border-bottom-color: #cc8b13;
        background-color: var(--lightYallow);

        ${
            props.hoverstyle === "" && css`
                &:hover {
                    background-color: var(--lightYallowHover);
                    border-bottom-color: var(--lightYallow);
                }
            `
        }

    `}

    ${props => props.btn === "BUTTON_SILVER" && css`
        border-bottom-color: #6b8997;
        background-color: var(--silver);

        ${
            props.hoverstyle === "" && css`
                &:hover {
                    background-color: var(--silverHover);
                    border-bottom-color: var(--silver);
                }
            `
        }

    `}

    ${props => props.borderbottom === "no_board" && css`
        border-bottom-width: 0px;
    `}

    &:disabled {
        opacity: .6;
        cursor: not-allowed;
    }

`;