interface IProps {
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
}
declare function Input({ type, placeholder, onChange, value, error }: IProps): import("react/jsx-runtime").JSX.Element;
export default Input;
