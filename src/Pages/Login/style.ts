import styled from "styled-components";

export const Container = styled.div`
    padding: 0 25px 40px 25px;

    @media (max-width: 450px) {
        padding: 0 10px 40px 10px;
    }
`;

export const InputPassword = styled.div`
    position: relative;

    input {
        width: 100%;
        padding-right: 35px;
    }

    img {
        position: absolute;
        right: 10px;

        width: 15px;
        height: fit-content;

        cursor: pointer;
    }
`;

export const Links = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px;

    margin-top: 10px;

`;
