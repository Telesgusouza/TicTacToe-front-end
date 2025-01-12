import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as Styled from "./style";
function Input(_a) {
    var type = _a.type, placeholder = _a.placeholder, onChange = _a.onChange, value = _a.value, _b = _a.error, error = _b === void 0 ? false : _b;
    return (_jsx(_Fragment, { children: _jsx(Styled.Input, { error: error ? "error" : "", type: type, placeholder: placeholder, onChange: onChange, value: value }) }));
}
export default Input;
