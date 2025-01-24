var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import * as Styled from './style';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';
export default function ResetPassword() {
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(false), wrongEmail = _b[0], setWrongEmail = _b[1];
    var _c = useState(""), codeInput = _c[0], setCodeInput = _c[1];
    var _d = useState(false), wrongCodeInput = _d[0], setWrongCodeInput = _d[1];
    var _e = useState({
        value: "",
        type: "password",
        wrong: false
    }), password = _e[0], setPassword = _e[1];
    var _f = useState({
        value: "",
        type: "password",
        wrong: false
    }), passwordConfirm = _f[0], setPasswordConfirm = _f[1];
    var _g = useState({ view: "EMAIL" }), view = _g[0], setView = _g[1];
    var _h = useState(0), timeLeft = _h[0], setTimeLeft = _h[1];
    var _j = useState(false), btnDisable = _j[0], setBtnDisable = _j[1];
    var navigate = useNavigate();
    useEffect(function () {
        var intervalId = null;
        if (timeLeft > 0) {
            intervalId = setInterval(function () {
                setTimeLeft(function (prevTime) { return prevTime - 1; });
            }, 1000);
        }
        return function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [timeLeft]);
    useEffect(function () {
        if (wrongEmail) {
            setWrongEmail(false);
        }
    }, [email]);
    useEffect(function () {
        if (wrongCodeInput) {
            setWrongCodeInput(false);
        }
    }, [codeInput]);
    useEffect(function () {
        if (password.wrong) {
            setPassword(__assign(__assign({}, password), { wrong: false }));
        }
    }, [password]);
    useEffect(function () {
        if (passwordConfirm.wrong) {
            setPasswordConfirm(__assign(__assign({}, passwordConfirm), { wrong: false }));
        }
    }, [passwordConfirm]);
    function SubmitResetPassword() {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setBtnDisable(true);
                        if (password.value.length < 6) {
                            toast.warn("Senha muito curta", { autoClose: 2000 });
                            setPassword(__assign(__assign({}, password), { wrong: true }));
                            setBtnDisable(false);
                            return [2 /*return*/];
                        }
                        if (password.value.length > 50) {
                            toast.warn("Senha muito longa", { autoClose: 2000 });
                            setPassword(__assign(__assign({}, password), { wrong: true }));
                            setBtnDisable(false);
                            return [2 /*return*/];
                        }
                        if (password.value !== passwordConfirm.value) {
                            toast.warn("Senhas diferentes", { autoClose: 2000 });
                            setPasswordConfirm(__assign(__assign({}, passwordConfirm), { wrong: true }));
                            setBtnDisable(false);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.patch(baseUrl + "/auth/pass_password", {
                                email: email,
                                ticket: codeInput,
                                password: password.value
                            })];
                    case 2:
                        _a.sent();
                        toast.success("Senha resetada com sucesso", { autoClose: 2400 });
                        toast.warn("Você será redirencionado para a página principal", { autoClose: 2000 });
                        setTimeout(function () {
                            navigate("/");
                        }, 2400);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error ao redefinidir senha: ", error_1);
                        setPassword(__assign(__assign({}, password), { wrong: true }));
                        toast.error("Error ao refefinir senha.", { autoClose: 2400 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function verifyCode() {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setBtnDisable(true);
                        setTimeLeft(20);
                        if (codeInput.length <= 0 || codeInput.length > 6) {
                            toast.warn("Código invalido");
                            setBtnDisable(true);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post(baseUrl + "/auth/verify_ticket", {
                                ticket: codeInput
                            }).catch(function () {
                                toast.warn("Código inválido");
                            })];
                    case 2:
                        _a.sent();
                        toast.success("código valido", { autoClose: 2100 });
                        setView({ view: 'RESET_PASSWORD' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        toast.warn("Surgiu um erro ao verificar o código");
                        setView({ view: "CODE" });
                        setWrongCodeInput(true);
                        console.error("Error ", error_2);
                        return [3 /*break*/, 4];
                    case 4:
                        setBtnDisable(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleTicketEmail() {
        return __awaiter(this, void 0, void 0, function () {
            var emailRegex, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setBtnDisable(true);
                        emailRegex = /^(?!.*(@|\.|\-)$)[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}(?:\.[\w\-]{2,})?$/i;
                        if (email === "") {
                            errorEmail("Campo não pode ser vázio");
                            return [2 /*return*/];
                        }
                        if (!emailRegex.test(email)) {
                            errorEmail("Formato de email invalido");
                            return [2 /*return*/];
                        }
                        if (timeLeft > 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post(baseUrl + "/auth/email_reset_password", {
                                to: email
                            })];
                    case 2:
                        _a.sent();
                        setView({ view: "CODE" });
                        setTimeLeft(60);
                        toast.success("Verifique sua caixa de entrada e spam", { autoClose: 2100 });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        toast.warn("Ocorreu um erro ao enviar email");
                        setView({ view: "EMAIL" });
                        setWrongEmail(true);
                        console.log("Error in email: ", e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setBtnDisable(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function errorEmail(msg) {
        toast.warn(msg, { autoClose: 2400 });
        setView({ view: "EMAIL" });
        setWrongEmail(true);
        setBtnDisable(false);
    }
    function returnViewEmail() {
        setCodeInput("");
        setEmail("");
        setPassword({ value: "", type: "password", wrong: false });
        setPasswordConfirm({ value: "", type: "password", wrong: false });
        setView({ view: "EMAIL" });
    }
    function btnBack() {
        switch (view.view) {
            case "CODE": {
                returnViewEmail();
                break;
            }
            case "RESET_PASSWORD": {
                returnViewEmail();
                break;
            }
            case "EMAIL": {
                navigate("/login", { replace: true });
                break;
            }
            default: {
                break;
            }
        }
    }
    function toggleViewPassword(whichInput) {
        switch (whichInput) {
            case "password": {
                var typePassword = password.type === "password" ? "text" : "password";
                setPassword(__assign(__assign({}, password), { type: typePassword }));
                break;
            }
            case "confirm": {
                var typePassword = passwordConfirm.type === "password" ? "text" : "password";
                setPasswordConfirm(__assign(__assign({}, passwordConfirm), { type: typePassword }));
                break;
            }
            default: {
                break;
            }
        }
    }
    return (_jsxs(Styled.Container, { children: [_jsx(Styled.BtnBackPage, { children: _jsx("span", { onClick: function () { return btnBack(); }, children: "Voltar" }) }), _jsxs("article", { children: [_jsx("h1", { children: "Resetar sua senha" }), view.view === "EMAIL" && (_jsxs(_Fragment, { children: [_jsx("p", { children: "Preencha o campo email, e clique no bot\u00E3o, ser\u00E1 enviado um Email com o chave de acesso" }), _jsx(Input, { error: wrongEmail, type: "text", placeholder: 'Email', value: email, onChange: function (e) { return setEmail(e.target.value); } }), _jsx(Button, { disabled: btnDisable ? "disabled_button" : "", btn: 'BUTTON_SILVER', option: 'small', onClick: handleTicketEmail, children: "Enviar para email" })] })), view.view == "CODE" && (_jsxs(_Fragment, { children: [_jsx("p", { children: "Preencha o campo abaixo com o c\u00F3digo enviado" }), _jsx(Input, { error: wrongCodeInput, type: 'text', placeholder: 'C\u00F3digo de Acesso', value: codeInput, onChange: function (e) { return setCodeInput(e.target.value); } }), _jsx(Styled.Timer, { children: timeLeft > 0 ? (_jsxs("p", { children: ["Reenviar c\u00F3digo em : ", timeLeft] })) : (_jsx("p", { style: { cursor: 'pointer' }, onClick: handleTicketEmail, children: "Reenviar c\u00F3digo" })) }), _jsx(Button, { disabled: btnDisable ? "disabled_button" : "", btn: 'BUTTON_SILVER', option: 'small', onClick: verifyCode, children: "Confiramr c\u00F3digo" })] })), view.view === "RESET_PASSWORD" && (_jsxs(_Fragment, { children: [_jsx("p", { children: "Preencha os campos abaixo para que possa resetar sua senha" }), _jsxs(Styled.InputPassword, { children: [_jsx(Input, { error: password.wrong, type: password.type, placeholder: 'Digite sua senha', onChange: function (e) { return setPassword(__assign(__assign({}, password), { value: e.target.value })); }, value: password.value }), _jsx("img", { src: password.type === "password" ? imgLockClose : imgLockOpen, alt: "icone de fechadura aberta", onClick: function () { return toggleViewPassword("password"); } })] }), _jsxs(Styled.InputPassword, { children: [_jsx(Input, { error: passwordConfirm.wrong, type: passwordConfirm.type, placeholder: 'Confirme sua senha', onChange: function (e) { return setPasswordConfirm(__assign(__assign({}, passwordConfirm), { value: e.target.value })); }, value: passwordConfirm.value }), _jsx("img", { src: passwordConfirm.type === "password" ? imgLockClose : imgLockOpen, alt: "icone de fechadura aberta", onClick: function () { return toggleViewPassword("confirm"); } })] }), _jsx(Button, { btn: 'BUTTON_SILVER', option: 'small', onClick: SubmitResetPassword, children: " Mudar senha " })] }))] })] }));
}
