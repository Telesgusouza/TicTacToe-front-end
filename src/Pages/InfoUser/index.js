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
import { useEffect, useState } from 'react';
import * as Styled from './style';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import ambientMusic from '../../assets/songs/default_calm.mp3';
import { Audio } from '../../Components/Audio';
import DeleteFromAccount from '../../Components/DeleteFromAccount';
function InfoUser() {
    var _a = useState(null), infoUser = _a[0], setInfoUser = _a[1];
    var _b = useState(false), matchDataShow = _b[0], setMatchDataShow = _b[1];
    var _c = useState(null), startingData = _c[0], setStartingData = _c[1];
    var _d = useState(false), toggleDeleteFromAccount = _d[0], setToggleDeleteFromAccount = _d[1];
    var _e = useState(true), loadingData = _e[0], setLoadingData = _e[1];
    var navigate = useNavigate();
    var page = useParams().page;
    useEffect(function () {
        function getInfoUser() {
            return __awaiter(this, void 0, void 0, function () {
                var jsonToken, token, requestData, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            jsonToken = localStorage.getItem("token");
                            if (!jsonToken) return [3 /*break*/, 2];
                            token = JSON.parse(jsonToken);
                            return [4 /*yield*/, axios.get(baseUrl + "/user", {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token)
                                    }
                                })];
                        case 1:
                            requestData = _a.sent();
                            data = requestData.data;
                            setInfoUser(data);
                            percentageStartingData();
                            setLoadingData(false);
                            return [3 /*break*/, 3];
                        case 2:
                            toast.dismiss();
                            toast.error("Não a um token salvo", { autoClose: 3800 });
                            toast.warn("Você será redirecionado para o login", { autoClose: 3800 });
                            setTimeout(function () {
                                navigate("/login", { replace: true });
                            }, 4000);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.error("Error, user not found: " + error_1);
                            toast.error("Usuario não encontrado");
                            toast.warn("ATENÇÃO, Você será redirecionado para a página de login");
                            setTimeout(function () {
                                navigate("/login", { replace: true });
                            }, 4000);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        getInfoUser();
        return function () { };
    }, []);
    useEffect(function () {
        percentageStartingData();
    }, [infoUser, matchDataShow]);
    function percentageStartingData() {
        if (matchDataShow && infoUser && startingData === null) {
            if (infoUser.numberOfWins === 0 && infoUser.numberOfDraws === 0 && infoUser.numberOfDefeats === 0) {
                var data = {
                    defeats: "0",
                    draws: "0",
                    wins: "0"
                };
                setStartingData(data);
            }
            else {
                var totalMatches = infoUser.numberOfWins + infoUser.numberOfDraws + infoUser.numberOfDefeats;
                var wins = ((infoUser.numberOfWins * 100) / totalMatches).toFixed(2); // porcentagem
                var draws = ((infoUser.numberOfDraws * 100) / totalMatches).toFixed(2); // porcentagem
                var defeats = ((infoUser.numberOfDefeats * 100) / totalMatches).toFixed(2); // porcentagem
                var data = {
                    defeats: defeats,
                    draws: draws,
                    wins: wins
                };
                setStartingData(data);
            }
        }
    }
    function handleBackNavigate() {
        switch (page) {
            case "menu_online": {
                setTimeout(function () {
                    navigate("/menu_match_online", { replace: true });
                }, 300);
                break;
            }
            default: {
                setTimeout(function () {
                    navigate("/", { replace: true });
                }, 300);
            }
        }
    }
    function viewPopUpDeleteFromAccount() {
        setToggleDeleteFromAccount(!toggleDeleteFromAccount);
    }
    function LogOutOfAccount() {
        localStorage.removeItem("photo_user");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.warn("Saindo da conta", { autoClose: 2000 });
        setTimeout(function () {
            navigate("/", { replace: true });
        }, 2000);
    }
    return (_jsxs(Styled.Container, { loading: loadingData ? "loading" : "no_loading", children: [toggleDeleteFromAccount && (_jsx(_Fragment, { children: _jsx(DeleteFromAccount, { onClick: viewPopUpDeleteFromAccount }) })), _jsx(Styled.Back, { children: _jsx("p", { onClick: handleBackNavigate, id: 'back-button', children: "Voltar" }) }), _jsx(Styled.Loading, { loading: loadingData ? "loading" : "no_loading", id: 'loading' }), _jsxs("section", { children: [_jsxs("label", { htmlFor: "name", children: [_jsx("span", { id: 'name', children: "Nome" }), _jsx("p", { children: infoUser === null || infoUser === void 0 ? void 0 : infoUser.name })] }), _jsxs("label", { htmlFor: "name", children: [_jsx("span", { children: "E-mail" }), _jsx("p", { children: infoUser === null || infoUser === void 0 ? void 0 : infoUser.login })] }), _jsxs(Styled.StartingData, { children: [_jsxs("div", { children: [_jsx("h2", { children: "Seus dados de partidas" }), _jsx("button", { onClick: function () { return setMatchDataShow(!matchDataShow); }, children: matchDataShow ? "exato" : "Porcentagem" })] }), _jsxs("ul", { children: [_jsx("li", { children: "Vit\u00F3rias" }), _jsx("li", { children: "Empate" }), _jsx("li", { children: "Derrota" }), _jsx("li", { children: matchDataShow ? (startingData === null || startingData === void 0 ? void 0 : startingData.wins) + "%" : infoUser === null || infoUser === void 0 ? void 0 : infoUser.numberOfWins }), _jsx("li", { children: matchDataShow ? (startingData === null || startingData === void 0 ? void 0 : startingData.draws) + "%" : infoUser === null || infoUser === void 0 ? void 0 : infoUser.numberOfDraws }), _jsx("li", { children: matchDataShow ? (startingData === null || startingData === void 0 ? void 0 : startingData.defeats) + "%" : infoUser === null || infoUser === void 0 ? void 0 : infoUser.numberOfDefeats })] })] }), _jsxs(Styled.ContainerButton, { children: [_jsx("button", { onClick: LogOutOfAccount, children: "Sair da conta" }), _jsx("button", { onClick: viewPopUpDeleteFromAccount, children: "Deletar conta" })] })] }), _jsx(Styled.ContentMusic, { children: _jsx(Audio, { music: ambientMusic }) })] }));
}
export default InfoUser;
