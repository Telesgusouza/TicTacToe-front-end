var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
export var Input = styled.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["    \n    padding: 3px 10px 3px 15px;\n\n    color: white;\n\n    border: none;\n    border-bottom: 2px solid ", "; // #df2c14\n\n    background-color: transparent;\n\n    outline: 0;\n    transition: border .14s ease;\n\n    &:focus {\n        border-bottom-color: var(--silverHover);\n    }\n\n    &::placeholder {\n        color: var(--silverHover);\n    }\n    \n"], ["    \n    padding: 3px 10px 3px 15px;\n\n    color: white;\n\n    border: none;\n    border-bottom: 2px solid ", "; // #df2c14\n\n    background-color: transparent;\n\n    outline: 0;\n    transition: border .14s ease;\n\n    &:focus {\n        border-bottom-color: var(--silverHover);\n    }\n\n    &::placeholder {\n        color: var(--silverHover);\n    }\n    \n"])), function (props) { return props.error === "error" ? '#ed3419' : 'var(--silver)'; });
var templateObject_1;
