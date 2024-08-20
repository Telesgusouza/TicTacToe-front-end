import styled from "styled-components";

interface ISourcePlayer {
    visible: boolean;
}

interface IContainerContent {
    disabled: boolean;
}

export const Container = styled.div`
    width: 100%;
    max-width: 590px;
    
    min-height: 100vh;

    padding: 10px;
    margin: 0 auto;

    padding-bottom: 50px;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;

    .photoPerfil {
        width: 30px;
        height: 30px;
        object-fit: cover;

        border-radius: 50%;

        background-color: #f0f0f0;
    }
`;

export const ContainerContent = styled.section<IContainerContent>`
    width: fit-content;
    padding: 15px;
    margin: 0 auto;
    margin-top: 30px;

    border-radius: 15px;

    box-shadow: 0 0 25px #18181840;
    background-color: var(--semiDarkNavy);

    @keyframes loading {
        0% {
            rotate: 0deg;
        }

        100% {
            rotate: 365deg;
        }
    }

    button {
        width: 100%;

        padding-bottom: 15px;
        border-width: 0px;

        cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    }

    img {
        height: 16px;
        animation: loading 1s infinite;
    }
`;

export const SourcePlayer = styled.label<ISourcePlayer>`
    display: flex;
    flex-direction: column;

    margin-top: 20px;

    position: relative;

    span {
        margin-bottom: 5px;

        font-size: .75rem;
        color: var(--silver);
    }

    ul {
        position: absolute;
        top: calc(100% + 5px);

        display: ${props => props.visible ? "grid" : "none"};

        width: 100%;
        margin-bottom: 20px;

        background-color: white;
        box-shadow: 0 0 25px #0f0f0fff;

        li {
            width: 100%;
            padding: 6px 8px;

            font-size: .9rem;
            color: var(--silver);

            background-color: var(--semiDarkNavy);

            transition: background-color, color .3s ease;
            cursor: pointer;

            &:hover {
                background-color: var(--lightBlue);
                color: #1a2a33;
                
            }
        }
    }
`

export const AccordionFriends = styled.div`
    margin-top: 20px;

    color: var(--silver);

    strong {
        font-weight: 500;
    }

    ul {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 6px;

        padding: 5px 7px;
        border-radius: 7px;
        margin-top: 10px;

        background-color: var(--darkNavy);
    }

    li {

        font-size: .95rem;

        cursor: pointer;
    }
`;