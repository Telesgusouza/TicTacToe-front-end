import React from 'react';
interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: "small" | "large";
    borderbottom?: "" | "no_board";
    disabled?: "" | "disabled_button";
    onClick?: () => void;
    hoverstyle?: "" | "no_hover_style";
}
declare function Button({ children, btn, option, borderbottom, disabled, onClick, hoverstyle }: IProps): import("react/jsx-runtime").JSX.Element;
export default Button;
