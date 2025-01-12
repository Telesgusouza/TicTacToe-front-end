import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Styled from './style';
import warnImg from '../../assets/warn.svg';
export function AlertWarn(_a) {
    var msg = _a.msg, show = _a.show;
    return (_jsxs(Styled.Container, { show: show, children: [_jsx("img", { src: warnImg, alt: "imagem de aten\u00E7\u00E3o" }), _jsx("p", { children: msg })] }));
}
