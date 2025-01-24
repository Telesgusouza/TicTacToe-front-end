import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 590px;
    
    min-height: 100vh;

    padding: 15px;
    padding-top: 25px;
    margin: 0 auto;

    padding-bottom: 50px;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;

    img {
        cursor: pointer;
    }

    .photoPerfil {
        width: 30px;
        height: 30px;
        object-fit: cover;

        border-radius: 50%;

        background-color: #f0f0f0;

        cursor: pointer;
    }
`;

export const ContainerContent = styled.section`
    width: fit-content;
    padding: 15px;
    margin: 0 auto;
    margin-top: 30px;

    border-radius: 15px;

    box-shadow: 0 0 25px #18181840;
    background-color: var(--semiDarkNavy);

    h1 {
        margin-bottom: 30px;

        text-transform: uppercase;
        color: var(--silver);
    }

    button {
        width: 100%;

        border-width: 0px;
    }

`;

export const LoadingImg = styled.img`
    @keyframes loading {
        0% {
            rotate: 0deg;
        }

        100% {
            rotate: 365deg;
        }
    }


    height: 16px;
    animation: loading 1s infinite;
    

`;
