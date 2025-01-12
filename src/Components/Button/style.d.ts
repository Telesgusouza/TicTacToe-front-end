interface IProps {
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: "small" | "large";
    borderbottom: "" | "no_board";
    hoverstyle: "" | "no_hover_style";
}
export declare const Button: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IProps>> & string;
export {};
