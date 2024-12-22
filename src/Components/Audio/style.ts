import styled from "styled-components";


export const Container = styled.div`
    position: relative;

    &::after {
        content: "Deixar ativa trilha sonora";
        position: absolute;
        top: calc(100% + 12px);
        left: 0;

        width: 100px;

        max-height: 0%;
        overflow: hidden;

        border-radius: 5px;
        /* padding: 8px; */
        padding: 0;

        font-weight: 400;
        color: #f0f0f0;

        background-color: var(--semiDarkNavy);

        box-shadow: 0 0 10px rgba(0, 0, 0, .2);

        transition: all .2s ease-in-out .4s;
    }

    &:hover::after {
        padding: 8px;
        max-height: 100%;
    }
`;

export const ContainerContent = styled.div`
    display: flex;
    position: relative;

    height: 60px;
    width: 100%;
    max-width: 60px;
    padding-right: 22px;
    
    border-radius: 50px;

    background-color: var(--lightYallow);
    
    overflow: hidden;
    transition: max-width .2s ease;

    &:hover {
        max-width: 300px;
    }

    audio {
        position: absolute;
        display: none;
    }

    input {
        width: 100%;
        background-color: red;

        cursor: pointer;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 15px;
        border-radius: 50%;

        border: none;

        background-color: transparent;
    }

    img {
        width: 30px;
        height: 30px;
        margin-right: 7px;
    }
`;
