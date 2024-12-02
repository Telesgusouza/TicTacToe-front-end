import styled from "styled-components";

export const Rotate = styled.img`
    width: 100%;
    height: 100%;

    max-width: 28px;

    @keyframes loading {
        from {
            rotate: 0deg;
        }

        to {
            rotate: 360deg;
        }
    }

    animation: loading 1s linear infinite;
`;
