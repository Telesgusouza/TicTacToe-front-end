import React from "react";
interface IProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
declare function Form({ children, onSubmit }: IProps): import("react/jsx-runtime").JSX.Element;
export default Form;
