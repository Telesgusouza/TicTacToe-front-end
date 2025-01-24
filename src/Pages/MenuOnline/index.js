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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";
import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';
import Button from "../../Components/Button";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";
import { toast } from "react-toastify";
import Reload from "../../Components/Reload";
import { AlertWarn } from "../../Components/AlertWarn";
import baseUrlMatchMatchmaking from "../../Config/baseUrlMatchMatchmaking";
function MenuOnline() {
    var _a = useState(null), photo = _a[0], setPhoto = _a[1];
    var _b = useState(false), loadingMatch = _b[0], setLoadingMatch = _b[1];
    var _c = useState(false), closeQueue = _c[0], setCloseQueue = _c[1];
    var _d = useState(false), highLatency = _d[0], setHighLatency = _d[1];
    var navigate = useNavigate();
    var _e = useState(null), ws = _e[0], setWs = _e[1];
    useEffect(function () {
        var photoLocalStorage = localStorage.getItem("photo_user");
        if (photoLocalStorage) {
            var photoJson = JSON.parse(photoLocalStorage);
            setPhoto(photoJson.photo);
        }
    }, []);
    useEffect(function () {
        function connectWebSocket() {
            return __awaiter(this, void 0, void 0, function () {
                var idUser, newWs_1, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!loadingMatch) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, handleConnectMatch()];
                        case 2:
                            idUser = _a.sent();
                            newWs_1 = new WebSocket(baseUrlMatchMatchmaking + "/matchmaking?id_user=" + idUser.uid);
                            setTimeout(function () {
                                toast.warn("Erro ao encotrar partida");
                                closeQueueMatch(newWs_1);
                            }, 1000 * 70);
                            setWs(newWs_1);
                            newWs_1.onopen = function () {
                                console.log("Conexão estabelecida");
                                var currentTime = Date.now();
                                newWs_1.send("pong:".concat(currentTime)); // Envia ping assim que a conexão é aberta
                            };
                            newWs_1.onclose = function () {
                                console.log("Conexão encerrada");
                                setLoadingMatch(false);
                                setWs(null);
                            };
                            if (closeQueue) {
                                closeQueueMatch(newWs_1);
                                setCloseQueue(false);
                                setLoadingMatch(false);
                                setWs(null);
                            }
                            newWs_1.onmessage = function (event) {
                                var message = event.data;
                                if (message.startsWith('match_started')) {
                                    var matchData = JSON.parse(message.substring(13));
                                    console.log('Partida encontrada: ', matchData);
                                    // Lógica para iniciar a partida
                                }
                                else if (message === 'ping') {
                                    var currentTime = Date.now();
                                    newWs_1.send("pong:".concat(currentTime));
                                }
                                else if (message.startsWith('pong')) {
                                    var _a = message.split(':'), _ = _a[0], clientTimestamp = _a[1];
                                    if (clientTimestamp > 300) { // Ajuste este valor conforme necessário
                                        console.warn("Lat\u00EAncia alta detectada: ".concat(clientTimestamp, "ms"));
                                        setHighLatency(true);
                                    }
                                    else {
                                        setHighLatency(false);
                                    }
                                }
                                else if (message.startsWith('Match found!:')) {
                                    closeQueueMatch(newWs_1);
                                    changePage(message.replace("Match found!: ", ""));
                                }
                                // erros
                                else if (message.startsWith("Erro: ID de usuário não encontrado na sessão")) {
                                    toast.warn("Erro no login, tente refazer o login na sua conta");
                                    closeQueueMatch(newWs_1);
                                }
                                else if (message.startsWith("WebSocket session not found for one of the players")) {
                                    toast.warn("Erro ao estabelecer conexão");
                                    closeQueueMatch(newWs_1);
                                }
                            };
                            newWs_1.onerror = function (error) {
                                console.log("Error capturado no websockets > ", error);
                                setWs(null);
                                setLoadingMatch(false);
                            };
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.error("Erro na conexão websockets/WS > ", e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        connectWebSocket();
        return function () {
            ws === null || ws === void 0 ? void 0 : ws.close();
        };
    }, [loadingMatch, closeQueue]);
    function closeQueueMatch(currentWs) {
        if (currentWs) {
            currentWs.close();
            setLoadingMatch(false);
            setWs(null);
        }
    }
    function queueMatch() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (loadingMatch) {
                    setCloseQueue(true);
                }
                else {
                    setLoadingMatch(true);
                }
                return [2 /*return*/];
            });
        });
    }
    function handleConnectMatch() {
        return __awaiter(this, void 0, void 0, function () {
            var tokenJson, token, requestData, error_1, message;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenJson = localStorage.getItem("token");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!tokenJson) return [3 /*break*/, 3];
                        token = JSON.parse(tokenJson);
                        return [4 /*yield*/, axios.get(baseUrl + "/user/id", {
                                'headers': {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 2:
                        requestData = _b.sent();
                        return [2 /*return*/, requestData.data];
                    case 3:
                        console.error("Token not found");
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        if (axios.isAxiosError(error_1)) {
                            message = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data.message;
                            switch (message) {
                                case "account already exists": {
                                    toast.error("Conta não encontrada");
                                    toast.warn("ATENÇÃO, você será redirecionado para o login para que possa fazer a authenticação");
                                    setTimeout(function () {
                                        navigate("/login");
                                    }, 3000);
                                    break;
                                }
                                default: {
                                    toast.error("Erro inesperado ao trazer dados do usuario");
                                    break;
                                }
                            }
                        }
                        else {
                            toast.error("Erro com os dados do usuario");
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function changePage(idMatch) {
        toast.success("Partida encontrada com sucesso");
        setTimeout(function () {
            navigate("/home/online/" + idMatch, { replace: true });
        }, 500);
    }
    function handleNavigate(url) {
        navigate(url, { replace: true });
    }
    return (_jsxs(_Fragment, { children: [_jsx(AlertWarn, { msg: "Alta latencia", show: highLatency ? "see" : "not_see" }), _jsxs(Styled.Container, { children: [_jsxs(Styled.Header, { children: [_jsx("img", { src: logoImg, alt: "logo do site", onClick: function () { return handleNavigate("/"); } }), _jsx("img", { src: photo ? photo : noUser, alt: "foto do usuario", onClick: function () { return handleNavigate("/info_user/menu_online"); }, className: "photoPerfil" })] }), _jsxs(Styled.ContainerContent, { children: [_jsx("h1", { children: "Procurar Partida" }), _jsx(Button, { onClick: queueMatch, btn: "BUTTON_YALLOW", option: "small", children: loadingMatch ? _jsxs(_Fragment, { children: [" ", _jsx(Reload, {}), " "] }) : 'Procurar Partida' })] })] })] }));
}
export default MenuOnline;
