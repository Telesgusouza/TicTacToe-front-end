import React from "react";

import * as Styled from './style';

interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: "small" | "large"; // false === small

    borderbottom?: "" | "no_board"; // false === 
    disabled?: "" | "disabled_button";
    onClick?: () => void;

    hoverstyle?: "" | "no_hover_style";
}

function Button({
    children,
    btn,
    option,

    borderbottom = "",
    disabled = "",
    onClick,

    hoverstyle = ""
}: IProps) {

    return (
        <Styled.Button
            btn={btn}
            option={option}

            borderbottom={borderbottom}
            disabled={disabled === "disabled_button"}
            onClick={onClick}

            hoverstyle={hoverstyle}
        >

            {children}
        </Styled.Button>
    )
}

export default Button;