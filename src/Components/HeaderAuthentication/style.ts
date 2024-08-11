import styled from "styled-components";

export const Header = styled.header`
    width: 100%;
    max-width: 800px;

    margin: 0 auto;
    padding: 14px 0;

    li {
        width: fit-content;
        padding: 0 5px;

        color: var(--silver);

        position: relative;

        transition: color .14s ease;
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            top: calc(100% + 2px);
            left: 50%;

            width: 0;
            height: 1px;

            background-color: var(--silverHover);

            transition: all .14s ease;
        }



        &:hover {
            color: var(--silverHover);
        
            &::after {
                left: 0;
                width: 100%;
            }
        }
    }
`;