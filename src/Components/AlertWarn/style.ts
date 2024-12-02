import styled from "styled-components";

interface Props {
    show: "see" | "not_see"
}

export const Container = styled.div<Props>`
    position: absolute;
    bottom: 10px;
    right: 10px;

    /* padding: 7px;
    background-color: #FFDE21; */

    display: ${props => props.show == "see" ? "flex" : "none"};
    flex-direction: row;

    justify-content: center;
    align-items: center;

    img {
        width: 20px;
        margin-right: 8px;
    }

    p {
        color: #f8f8f8;
        font-weight: 700;

        font-size: .8rem;
    }
`;