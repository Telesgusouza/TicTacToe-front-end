import styled, { css } from "styled-components";

interface IProps {
    loading?: "loading" | "";
}

export const Container = styled.div<IProps>`
    min-width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    
    padding: 14px;

    section {
        width: 100%;
        max-width: 400px;

        padding: 18px 14px;

        background-color: purple;

        ${props => css`
        
            `}
    }
`;