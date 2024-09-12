import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;

    width: 100%;
    max-width: 350px;

    padding: 14px 20px;

    margin: 0 auto;
    margin-top: 20px;

    border-radius: 10px;
    border-bottom: 4px solid #10212a;

    background-color: var(--semiDarkNavy);

    font-size: .9rem;
    color: #f1f1f1;

    img {
        height: 90px;
        max-width: 300px;
        
        object-fit: cover;
        border: 5px solid #1a2a33;
    }

    label {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1px;
    }

    strong {
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: 1.1rem;
    }

    @media (max-width: 440px) {
        button {
            padding: 15px 15px;
        }
    }
`;