import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    min-height: 100vh;

    color: var(--silver);

    article {
        width: 100%;
        max-width: 480px;

        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;

        padding: 30px 20px;

        border-radius: 15px;

        text-align: center;

        background-color: var(--semiDarkNavy);
        box-shadow: 0 0 25px #18181840;

    }

    h1 {
        font-size: 4rem;
        line-height: 3.4rem;
    }

    p {
        font-size: 1.2rem;
    }
`;

export const BtnBackPage = styled.div`
    width: 100%;
    max-width: 480px;

    margin-bottom: 15px;

    span {
        padding: 0 14px;
        font-size: 1.2rem;

        cursor: pointer;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            top: calc(100% + 5px);
            left: 50%;

            height: 1px;
            width: 0%;

            background-color: var(--silver);

            transition: all .2s ease;
        }

        &:hover::after {
            left: 0;
            width: 100%;
        }
    }
`;

export const Timer = styled.div`
    /* background-color: red; */
    margin: 0;

    p {
        width: fit-content;
        /* background-color: blue; */
    }
`;

export const InputPassword = styled.div`

    display: flex;
    /* justify-content: center; */
    align-items: center;
    
    position: relative;

    input {
        /* position: absolute; */
        width: 100%;
    }

    img {
        position: absolute;
        right: 12px;
        
        width: 15px;
        cursor: pointer;
    }
`;