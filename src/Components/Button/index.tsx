import React from "react";

import * as Styled from './style';

interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: boolean;

    borderBottom?: boolean;
    disabled?: boolean;
    onClick?: () => void;

    hoverStyle?: boolean;
}

function Button({
    children,
    btn,
    option,

    borderBottom = true,
    disabled = false,
    onClick,

    hoverStyle = true
}: IProps) {

    return (
        <Styled.Button
            btn={btn}
            option={option}

            borderBottom={borderBottom}
            disabled={disabled}
            onClick={onClick}

            hoverStyle={hoverStyle}
        >

            {children}
        </Styled.Button>
    )
}

export default Button;