import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 450px) {
        padding: 0 12px 20px 10px;
    }
`;

export const Header = styled.header`
    display: flex;
    justify-content: right;
    
    width: 100%;
    padding: 14px 0;

    ul {
        display: flex;
        flex-direction: row;
        text-transform: uppercase;

        color: var(--silver);
    }

    li {
        position: relative;

        padding: 0 5px;

        transition: color .14s ease;
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            left: 50%;
            top: calc(100% + 2px);

            height: 1px;
            width: 0;

            background-color: var(--silver);
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

export const Section = styled.section`
    width: 100%;
    max-width: 400px;

    margin: 40px auto 0 auto;
    padding: 30px 30px 25px 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--semiDarkNavy);
    border-radius: 15px;

    box-shadow: 0 0 25px #18181840;

    h1 {
        margin-bottom: 30px;

        text-transform: uppercase;
        color: var(--silver);
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 100%;
        margin-bottom: 15px;
    }

    @media (max-width: 450px) {
        padding: 30px 15px 20px 15px;
    }

`
