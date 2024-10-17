import * as Styled from "./style";

interface IProps {
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    error?: boolean;
}

function Input({type, placeholder, onChange, value, error = false}: IProps) {

    return (
        <>
            <Styled.Input 

                error={error ? "error" : ""}

                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value} 
            />
        </>
    )
}

export default Input;