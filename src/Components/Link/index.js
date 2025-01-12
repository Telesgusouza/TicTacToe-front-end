import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
var STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
};
export default function Link(_a) {
    var page = _a.page, children = _a.children;
    var _b = useState(STATUS.NORMAL), status = _b[0], setStatus = _b[1];
    var onMouseEnter = function () {
        setStatus(STATUS.HOVERED);
    };
    var onMouseLeave = function () {
        setStatus(STATUS.NORMAL);
    };
    return (_jsx("a", { className: status, href: page || '#', onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, children: children }));
}
