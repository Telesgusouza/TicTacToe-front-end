import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    z-index: 5;

    background-color: rgba(50, 50, 50, .3);

    section {
        border-radius: 5px;

        background-color: var(--semiDarkNavy);
        box-shadow: 0 0 15px rgba(20, 20, 20, .7);
    }

    button {
        width: fit-content;
        padding: 5px 18px;

        border: none;
        border-radius: 2px;

        font-size: 1rem;
        font-weight: 600;
        color: var(--darkNavy);

        background-color: var(--silver);

        transition: opacity .14s ease;

        &:hover {
            opacity: .8;
        }
    }

    div {
        width: 100%;
        max-width: 400px;

        margin-bottom: 20px;
    }

    p {
        position: relative;

        width: fit-content;
        padding: 0 6px;

        font-size: 1rem;
        font-weight: 600;

        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            top: calc(100% + 3px);
            left: 50%;

            width: 0;
            height: 1px;

            background-color: white;

            transition: all .2s ease;
        }

        &:hover::after {
            left: 0;
            width: 100%;
        }
    }

`;
