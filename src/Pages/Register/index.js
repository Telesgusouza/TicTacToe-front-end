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
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Styled from './style';
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import HeaderAuthentication from "../../Components/HeaderAuthentication";
import Input from '../../Components/Input';
import baseUrl from '../../Config/baseUrl';
import imgNoUser from '../../assets/no-user.svg';
import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';
import { toast } from 'react-toastify';
import Reload from '../../Components/Reload';
function Register() {
    var _a = useState(null), file = _a[0], setFile = _a[1];
    var _b = useState(null), fileBase64 = _b[0], setFileBase64 = _b[1];
    var _c = useState(""), name = _c[0], setName = _c[1];
    var _d = useState(""), email = _d[0], setEmail = _d[1];
    var _e = useState(""), password = _e[0], setPassword = _e[1];
    var _f = useState(false), wrongName = _f[0], setWrongName = _f[1];
    var _g = useState(false), wrongEmail = _g[0], setWrongEmail = _g[1];
    var _h = useState(false), wrongPassword = _h[0], setWrongPassword = _h[1];
    var _j = useState(false), seePassword = _j[0], setSeePassword = _j[1];
    var _k = useState(false), btnPress = _k[0], setBtnPress = _k[1];
    var navigate = useNavigate();
    useEffect(function () {
        if (wrongName) {
            setWrongName(false);
        }
    }, [name]);
    useEffect(function () {
        if (wrongEmail) {
            setWrongEmail(false);
        }
    }, [email]);
    useEffect(function () {
        if (wrongPassword) {
            setWrongPassword(false);
        }
    }, [password]);
    function handlePhoto(e) {
        var _a;
        if (e && e.target.files && e.target.files.length > 0) {
            var file_1 = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file_1.type.startsWith("image/")) {
                toast.warn("Arquivo deve ser uma foto");
            }
            if (file_1 && file_1.type.startsWith("image/")) {
                setFile(file_1);
                var reader_1 = new FileReader();
                reader_1.readAsDataURL(file_1);
                reader_1.onload = function () {
                    var imageUrl = reader_1.result;
                    setFileBase64(imageUrl);
                };
            }
        }
    }
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var emailRegex, token, jsonToken, error_1, message, data;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        e.preventDefault();
                        setBtnPress(true);
                        emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
                        setWrongName(name.length === 0);
                        setWrongEmail(!emailRegex.test(email));
                        setWrongPassword(password.length <= 5);
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 6, , 7]);
                        if (!(name.length > 0
                            && emailRegex.test(email)
                            && password.length > 5)) return [3 /*break*/, 5];
                        return [4 /*yield*/, axios.post("".concat(baseUrl, "/auth/register"), {
                                name: name,
                                login: email,
                                password: password + ""
                            })];
                    case 2:
                        token = _o.sent();
                        jsonToken = JSON.stringify(token.data.token);
                        localStorage.setItem("token", jsonToken);
                        if (!(file != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, handleSubmitFile(token.data.token)];
                    case 3:
                        _o.sent();
                        _o.label = 4;
                    case 4:
                        toast.success("Registrado com sucesso");
                        setTimeout(function () {
                            navigate("/", { replace: true });
                        }, 200);
                        setBtnPress(false);
                        _o.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _o.sent();
                        if (axios.isAxiosError(error_1)) {
                            message = (_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message;
                            data = {
                                timestamp: (_d = (_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.timestamp,
                                status: (_f = (_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.status,
                                error: (_h = (_g = error_1.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.error,
                                message: (_k = (_j = error_1.response) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.message,
                                path: (_m = (_l = error_1.response) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.path
                            };
                            switch (message) {
                                case "incorrect field. id account already exists": {
                                    toast.error("Conta já existe, tente outro email");
                                    setEmail("");
                                    break;
                                }
                                case "incorrect field. id must have at least 6 characters and less than 50": {
                                    toast.error("Senha deve ter entre 6 e 50 caracteres");
                                    break;
                                }
                                case "incorrect field. id Error while generating token": {
                                    toast.error("Erro ao gerar token de acesso");
                                    break;
                                }
                                default: {
                                    toast.error("Erro na requisição, tentei novamente");
                                }
                            }
                            console.error("Error request: " + data);
                        }
                        else {
                            toast.error("Erro desconhecido tente novamente mais tarde");
                            console.error('error the register > ', e);
                        }
                        setBtnPress(false);
                        return [3 /*break*/, 7];
                    case 7:
                        setBtnPress(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleSubmitFile(token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, error_2, message;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (file == null) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        if (!(file.type === "image/jpeg")) return [3 /*break*/, 3];
                        formData = new FormData;
                        formData.append('file', file);
                        return [4 /*yield*/, axios.post(baseUrl + "/file", formData, {
                                headers: {
                                    'Authorization': 'Bearer ' + token,
                                    'Content-Type': 'multipart/form-data'
                                }
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        if (axios.isAxiosError(error_2)) {
                            message = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data.metadataResponseDTO.message;
                            switch (message) {
                                case "invalid field": {
                                    toast.error("Tipo de arquivo invalido");
                                    break;
                                }
                                case "failed to upload file in s3 bucket": {
                                    toast.error("Erro ao subir imagem");
                                    break;
                                }
                                case "account already exists": {
                                    toast.warn("Conta já existe");
                                    setWrongPassword(true);
                                    break;
                                }
                                case "must have at least 6 characters and less than 50": {
                                    toast.warn("Senha invalida");
                                    setWrongPassword(true);
                                    break;
                                }
                                default: {
                                    toast.error("Erro inesperado ao subir arquivo");
                                }
                            }
                        }
                        else {
                            toast.error("Sugiu um erro ao subirmos a foto");
                        }
                        console.error("error submit file > ", error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function handleNavigate(url) {
        navigate(url, { replace: true });
    }
    return (_jsxs(Styled.Container, { children: [_jsx(HeaderAuthentication, {}), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx("h1", { children: "REGISTRO" }), _jsxs(Styled.PhotoInput, { children: [_jsx("input", { type: "file", placeholder: 'file_photo', onChange: function (e) { return handlePhoto(e); } }), _jsx("img", { src: fileBase64 ? fileBase64 : imgNoUser, alt: "photo user" })] }), _jsx(Input, { error: wrongName, type: "text", placeholder: 'Name', value: name, onChange: function (e) { return setName(e.target.value); } }), _jsx(Input, { error: wrongEmail, type: "text", placeholder: 'E-mail', value: email, onChange: function (e) { return setEmail(e.target.value); } }), _jsxs(Styled.InputPassword, { children: [_jsx(Input, { error: wrongPassword, type: seePassword ? "text" : "password", placeholder: 'Senha', value: password, onChange: function (e) { return setPassword(e.target.value); } }), _jsx("img", { src: seePassword ? imgLockOpen : imgLockClose, alt: "icon for password", onClick: function () { return setSeePassword(!seePassword); } })] }), _jsx(Button, { btn: 'BUTTON_SILVER', option: "small", disabled: btnPress ? "disabled_button" : "", children: btnPress ? (_jsx(Reload, {})) : "Registre-se" }), _jsxs("p", { children: ["J\u00E1 tem conta? ", _jsx("span", { onClick: function () { return handleNavigate("/login"); }, children: "Fa\u00E7a login" })] })] })] }));
}
export default Register;
