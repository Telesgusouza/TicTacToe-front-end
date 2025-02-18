import React from "react";
import * as Styled from './style';

interface IProps {
    children: React.ReactNode;
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, onSubmit }: IProps) {

    return (
        <Styled.Form onSubmit={onSubmit} role="form" >
            {children}
        </Styled.Form>
    )
};

export default Form;