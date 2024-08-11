import styled from "styled-components";


export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 22px;

    width: 100%;
    max-width: 400px;

    margin: 60px auto 0 auto;
    padding: 20px;

    border-radius: 15px;

    background-color: var(--semiDarkNavy);
    box-shadow: 0 0 25px #18181840;

    h1 {
        color: var(--silver);

        margin-bottom: 10px;
        text-align: center;
    }

    input {
        padding: 3px 10px 3px 15px;

        color: white;

        border: none;
        border-bottom: 2px solid var(--silver);

        background-color: transparent;

        outline: 0;
        transition: border .14s ease;

        &:focus {
            border-bottom-color: var(--silverHover);
        }

        &::placeholder {
            color: var(--silverHover);
        }
    }

    button {
        margin-top: 20px;
    }

    p {
        text-align: center;
        color: var(--silverHover);



        span {
            color: var(--lightBlueHover);
            cursor: pointer;

            &:hover {
                opacity: .8;
            }
        }
    }
`;