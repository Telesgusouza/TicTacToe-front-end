var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled, { css } from "styled-components";
export var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 20;\n\n    display: flex;\n    align-items: center;\n\n    width: 100%;\n    height: 100%;\n\n    padding: 20px 0;\n\n    overflow-y: scroll;\n\n    background-color: rgba(0, 0, 0, .4);\n\n\n    div:nth-child(1) {\n        width: 100%;\n    }\n"], ["\n\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 20;\n\n    display: flex;\n    align-items: center;\n\n    width: 100%;\n    height: 100%;\n\n    padding: 20px 0;\n\n    overflow-y: scroll;\n\n    background-color: rgba(0, 0, 0, .4);\n\n\n    div:nth-child(1) {\n        width: 100%;\n    }\n"])));
export var ContainerContent = styled.section(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    \n    width: 100%;\n    padding: 24px 20px;\n\n    text-align: center;\n\n    background-color: var(--semiDarkNavy);\n\n    article, div {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        width: fit-content;\n    }\n\n    article {\n        width: fit-content;\n        flex-direction: column;;\n\n        width: fit-content;\n        margin: 0 auto;\n    }\n\n    span {\n        font-size: 10px;\n        font-weight: 700;\n        color: var(--silver);\n    }\n\n\n    div {\n        flex-direction: row;\n        \n        &:nth-child(2) {\n\n        }\n\n        &:nth-child(3) {\n            display: flex;\n            flex-direction: row;\n\n        }\n\n        strong {\n                font-size: 28px;\n                font-weight: 700;\n\n                ", "\n\n\n            }\n    }\n\n\n    button {\n        width: fit-content;\n\n        font-size: 14px;\n        padding: 10px 15px;\n        border-radius: 12px;\n\n        &:nth-child(1) {\n            margin-right: 16px;\n        }\n    } \n"], ["\n    \n    width: 100%;\n    padding: 24px 20px;\n\n    text-align: center;\n\n    background-color: var(--semiDarkNavy);\n\n    article, div {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        width: fit-content;\n    }\n\n    article {\n        width: fit-content;\n        flex-direction: column;;\n\n        width: fit-content;\n        margin: 0 auto;\n    }\n\n    span {\n        font-size: 10px;\n        font-weight: 700;\n        color: var(--silver);\n    }\n\n\n    div {\n        flex-direction: row;\n        \n        &:nth-child(2) {\n\n        }\n\n        &:nth-child(3) {\n            display: flex;\n            flex-direction: row;\n\n        }\n\n        strong {\n                font-size: 28px;\n                font-weight: 700;\n\n                ", "\n\n\n            }\n    }\n\n\n    button {\n        width: fit-content;\n\n        font-size: 14px;\n        padding: 10px 15px;\n        border-radius: 12px;\n\n        &:nth-child(1) {\n            margin-right: 16px;\n        }\n    } \n"])), function (props) { return props.victory === "DRAW" ? css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                    color: var(--silver);\n                "], ["\n                    color: var(--silver);\n                "]))) : css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                    color: var(", ");\n                "], ["\n                    color: var(", ");\n                "])), props.victory === "PLAYER_ONE" ? "--lightYallow" : "--lightBlue"); });
export var Title = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    width: fit-content;\n\n    margin-top: 16px;\n    margin: 16px 0 24px 0;\n\n    img {\n        width: 50px;\n        margin-right: 24px;\n    }\n\n    @media (max-width: 340px) {\n        img {\n            width: 45px;\n            margin-right: 8px;\n        }\n    }\n"], ["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    width: fit-content;\n\n    margin-top: 16px;\n    margin: 16px 0 24px 0;\n\n    img {\n        width: 50px;\n        margin-right: 24px;\n    }\n\n    @media (max-width: 340px) {\n        img {\n            width: 45px;\n            margin-right: 8px;\n        }\n    }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;