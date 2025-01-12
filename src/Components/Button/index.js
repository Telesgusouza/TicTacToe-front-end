import { jsx as _jsx } from "react/jsx-runtime";
import * as Styled from './style';
function Button(_a) {
    var children = _a.children, btn = _a.btn, option = _a.option, _b = _a.borderbottom, borderbottom = _b === void 0 ? "" : _b, _c = _a.disabled, disabled = _c === void 0 ? "" : _c, onClick = _a.onClick, _d = _a.hoverstyle, hoverstyle = _d === void 0 ? "" : _d;
    return (_jsx(Styled.Button, { btn: btn, option: option, borderbottom: borderbottom, disabled: disabled === "disabled_button", onClick: onClick, hoverstyle: hoverstyle, children: children }));
}
export default Button;
