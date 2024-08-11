import React from "react";

import * as Styled from './style';

interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: boolean;
    borderBottom?: boolean;
}

function Button({ children, btn, option, borderBottom = true }: IProps) {

    return(
        <Styled.Button btn={btn} option={option} borderBottom={borderBottom} >
            {children}
        </Styled.Button>
    )
}

export default Button;