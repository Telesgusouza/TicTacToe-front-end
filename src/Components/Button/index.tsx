import React from "react";

import * as Styled from './style';

interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: boolean;
    borderBottom?: boolean;
    disabled?: boolean; 
}

function Button({ children, btn, option, borderBottom = true, disabled = false }: IProps) {

    return(
        <Styled.Button btn={btn} option={option} borderBottom={borderBottom} disabled={disabled} >
            {children}
        </Styled.Button>
    )
}

export default Button;