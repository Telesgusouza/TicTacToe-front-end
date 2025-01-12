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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './style';
import HeaderAuthentication from '../../Components/HeaderAuthentication';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { toast } from 'react-toastify';
import Reload from '../../Components/Reload';
function Login() {
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), password = _b[0], setPassword = _b[1];
    var _c = useState(false), wrongEmail = _c[0], setWrongEmail = _c[1];
    var _d = useState(false), wrongPassword = _d[0], setWrongPassword = _d[1];
    var _e = useState(false), seePassword = _e[0], setSeePassword = _e[1];
    var _f = useState(false), btnPress = _f[0], setBtnPress = _f[1];
    var navigate = useNavigate();
    useEffect(function () {
        if (email) {
            setWrongEmail(false);
        }
    }, [email]);
    useEffect(function () {
        if (password) {
            setWrongPassword(false);
        }
    }, [password]);
    function handleNavigate(url) {
        navigate(url, { replace: true });
    }
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var emailRegex, token, jsonToken, error_1, message;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        setBtnPress(true);
                        emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
                        setWrongEmail(!emailRegex.test(email));
                        setWrongPassword(password.length <= 5);
                        if (!(emailRegex.test(email) && password.length >= 6)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post(baseUrl + "/auth/login", {
                                login: email,
                                password: password
                            })];
                    case 2:
                        token = _b.sent();
                        jsonToken = JSON.stringify(token.data.token);
                        localStorage.setItem("token", jsonToken);
                        toast.success("Logado com sucesso");
                        setTimeout(function () {
                            navigate("/", { replace: true });
                        }, 200);
                        setBtnPress(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (axios.isAxiosError(error_1)) {
                            message = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data.message;
                            switch (message) {
                                case "Error with passed token. id Authentication failed": {
                                    toast.warn("Conta não existe, tente novamente");
                                    setWrongEmail(true);
                                    setWrongPassword(true);
                                    break;
                                }
                                case "incorrect field. id incorrect password": {
                                    toast.warn("Senha incorreta, tentei novamente");
                                    setWrongPassword(true);
                                    break;
                                }
                                case "incorrect field. id Authentication failed": {
                                    toast.warn("Autenticação falhou");
                                    setWrongEmail(true);
                                    setWrongPassword(true);
                                    break;
                                }
                                default: {
                                    toast.warn("Erro desconhecido ao fazer login");
                                }
                            }
                        }
                        else {
                            toast.error("Erro ao fazer login, tente novamente");
                        }
                        console.error("error login > ", e);
                        setBtnPress(false);
                        return [3 /*break*/, 4];
                    case 4:
                        setBtnPress(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs(Styled.Container, { children: [_jsx(HeaderAuthentication, {}), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx("h1", { children: "LOGIN" }), _jsx(Input, { error: wrongEmail, type: "text", placeholder: 'E-mail', value: email, onChange: function (e) { return setEmail(e.target.value); } }), _jsxs(Styled.InputPassword, { children: [_jsx(Input, { error: wrongPassword, type: seePassword ? "text" : "password", placeholder: 'Senha', value: password, onChange: function (e) { return setPassword(e.target.value); } }), _jsx("img", { src: seePassword ? imgLockOpen : imgLockClose, alt: "icon for password", onClick: function () { return setSeePassword(!seePassword); } })] }), _jsx(Button, { disabled: btnPress ? "disabled_button" : "", btn: 'BUTTON_SILVER', option: "small", children: btnPress ? (_jsx(Reload, {})) : "Entrar" }), _jsxs(Styled.Links, { children: [_jsxs("p", { children: ["Esqueceu sua senha ", _jsx("span", { onClick: function () { return handleNavigate("/reset_password"); }, children: "Recupere ela aqui" })] }), _jsxs("p", { children: ["Ainda n\u00E3o tem conta? ", _jsx("span", { onClick: function () { return handleNavigate("/register"); }, children: "Cadastre-se" })] })] })] })] }));
}
export default Login;
