import styled from "styled-components";

export const Container = styled.div`
    padding: 0 25px 50px 25px;
`;

export const PhotoInput = styled.div`
    display: flex;
    align-items: center;

    position: relative;

    width: 90px;
    height: 90px;

    border-radius: 50%;

    background-color: #c0c0c0;

    overflow: hidden;

    input {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        
        border: none;

        opacity: 0;
        z-index: 10;

        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;