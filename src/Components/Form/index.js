import { jsx as _jsx } from "react/jsx-runtime";
import * as Styled from './style';
function Form(_a) {
    var children = _a.children, onSubmit = _a.onSubmit;
    return (_jsx(Styled.Form, { onSubmit: onSubmit, role: "form", children: children }));
}
;
export default Form;
