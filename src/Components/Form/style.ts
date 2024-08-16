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

    @media (max-width: 450px) {
        padding: 24px 16px;
    }
`;