import styled from "styled-components";

export const Container = styled.div`
    padding: 0 25px 40px 25px;
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
