import styled from "styled-components";

interface IProps {
    error: string;
}

export const Input = styled.input<IProps>`    
    padding: 3px 10px 3px 15px;

    color: white;

    border: none;
    border-bottom: 2px solid ${props => props.error === "error" ? '#ed3419' : 'var(--silver)'}; // #df2c14

    background-color: transparent;

    outline: 0;
    transition: border .14s ease;

    &:focus {
        border-bottom-color: var(--silverHover);
    }

    &::placeholder {
        color: var(--silverHover);
    }
    
`;