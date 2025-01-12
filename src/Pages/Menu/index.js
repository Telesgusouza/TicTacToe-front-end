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
import Button from '../../Components/Button';
import * as Styled from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import ambientMusic from '../../assets/songs/default_calm.mp3';
import { Audio } from '../../Components/Audio';
function Menu() {
    var _a = useState(false), logged = _a[0], setLogged = _a[1];
    var navigate = useNavigate();
    useEffect(function () {
        function getUser() {
            return __awaiter(this, void 0, void 0, function () {
                var jsonToken, token, requestUser, dataUser, jsonUser, jsonDataUser, photoUser, jsonPhotoUser, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jsonToken = localStorage.getItem("token");
                            setLogged(false);
                            if (!jsonToken) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            token = JSON.parse(jsonToken);
                            return [4 /*yield*/, axios.get(baseUrl + "/user", {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token)
                                    }
                                })];
                        case 2:
                            requestUser = _a.sent();
                            dataUser = requestUser.data;
                            jsonUser = {
                                name: dataUser.name,
                                login: dataUser.login,
                                role: dataUser.role,
                                player: dataUser.player,
                                numberOfWins: dataUser.numberOfWins,
                                numberOfDraws: dataUser.numberOfDraws,
                                numberOfDefeats: dataUser.numberOfDefeats
                            };
                            jsonDataUser = JSON.stringify(jsonUser);
                            localStorage.setItem("user", jsonDataUser);
                            return [4 /*yield*/, axios.get(baseUrl + "/file", {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token)
                                    }
                                })];
                        case 3:
                            photoUser = _a.sent();
                            jsonPhotoUser = photoUser ? JSON.stringify(photoUser.data) : null;
                            if (jsonPhotoUser)
                                localStorage.setItem("photo_user", jsonPhotoUser);
                            setLogged(true);
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            console.error("Error > ", e_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        getUser();
    }, []);
    function handleNavigation(url) {
        if (url === "home/online" && !logged)
            return;
        navigate("/" + url, { replace: true });
    }
    return (_jsxs(Styled.Container, { children: [_jsx(Styled.Header, { children: _jsx("nav", { children: _jsx("ul", { children: logged ? (_jsx(_Fragment, { children: _jsx("li", { onClick: function () { return handleNavigation("login"); }, children: "Entrar com outra conta" }) })) : (_jsxs(_Fragment, { children: [_jsx("li", { onClick: function () { return handleNavigation("login"); }, children: "Login" }), " |", _jsx("li", { onClick: function () { return handleNavigation("register"); }, children: "registre-se" })] })) }) }) }), _jsxs(Styled.Section, { children: [_jsx("h1", { children: "Jogo da velha" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx(Button, { btn: 'BUTTON_YALLOW', option: "large", disabled: !logged ? "disabled_button" : "", onClick: function () { return handleNavigation("menu_match_online"); }, children: "ONLINE" }) }), _jsx("li", { children: _jsx(Button, { btn: 'BUTTON_BLUE', option: "large", onClick: function () { return handleNavigation("home/vs_player"); }, children: "VS PLAYER" }) }), _jsx("li", { children: _jsx(Button, { btn: 'BUTTON_BLUE', option: "large", onClick: function () { return handleNavigation("home/single_player"); }, children: "CONTRA A MAQUINA" }) })] })] }), _jsx(Styled.ContainerAudio, { children: _jsx(Audio, { music: ambientMusic }) })] }));
}
export default Menu;
