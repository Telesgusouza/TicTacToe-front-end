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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-scroll';
import axios from "axios";
import { toast } from 'react-toastify';
import * as Styled from './style';
import Button from '../../Components/Button';
import logoImg from '../../assets/logo.svg';
import IconXTurn from '../../assets/icon-x-turn.svg';
import IconOTurn from '../../assets/icon-o-turn.svg';
import iconRestart from '../../assets/icon-restart.svg';
import imgNoUser from '../../assets/no-user.svg';
import iconX from "../../assets/icon-x.svg";
import iconO from "../../assets/icon-o.svg";
import iconXEmptyField from "../../assets/icon-x-outline.svg";
import iconOEmptyField from "../../assets/icon-o-outline.svg";
import boardMusic from '../../assets/songs/board1.mp3';
import ModalVictoryMatch from "../../Components/ModalVictoryMatch";
import Reveal from "../../Components/Reveal";
import baseUrl from "../../Config/baseUrl";
import InfoAdversary from "../../Components/InfoAdversary";
import { Audio } from "../../Components/Audio";
function Home() {
    var initialBoard = {
        row_1: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_2: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_3: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
    };
    var _a = useState(null), photo = _a[0], setPhoto = _a[1];
    var _b = useState({ playerOne: 0, playerTwo: 0, draws: 0 }), scoreboard = _b[0], setScoreboard = _b[1];
    var _c = useState({ player: "DRAW", open: false }), playerVictory = _c[0], setPlayerVictory = _c[1];
    var _d = useState(false), turnPlayer = _d[0], setTurnPlayer = _d[1];
    var _e = useState(initialBoard), board = _e[0], setBoard = _e[1];
    // online
    var _f = useState(null), player = _f[0], setPlayer = _f[1];
    var _g = useState(null), infoMatch = _g[0], setInfoMatch = _g[1];
    var _h = useState(null), ws = _h[0], setWs = _h[1];
    var _j = useState({ loading: true, text: "Carregando Tabuleiro" }), statusOnlie = _j[0], setStatusOnlie = _j[1];
    var _k = useState(false), pauseMatch = _k[0], setPauseMatch = _k[1];
    var _l = useState(null), adversaryPhoto = _l[0], setAdversaryPhoto = _l[1];
    var _m = useState(false), infoAdversaryToggle = _m[0], setInfoAdversaryToggle = _m[1];
    var _o = useParams(), match = _o.match, idMatch = _o.idMatch;
    var navigate = useNavigate();
    useEffect(function () {
        function getInfoPlayer() {
            return __awaiter(this, void 0, void 0, function () {
                var jsonToken, token, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jsonToken = localStorage.getItem("token");
                            if (!jsonToken) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            token = JSON.parse(jsonToken);
                            return [4 /*yield*/, axios.get("".concat(baseUrl, "/user"), {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token),
                                    },
                                })];
                        case 2:
                            response = _a.sent();
                            setPlayer(response.data);
                            localStorage.setItem("user", JSON.stringify(response.data));
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            // console.error('Error fetching user data:', error.response?.data || error.message);
                            console.error('Error fetching user data: ', error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        function getInfoMatch() {
            return __awaiter(this, void 0, void 0, function () {
                var jsonToken, token, getMatch, jsonUser, user, photoUrl, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            jsonToken = localStorage.getItem("token");
                            if (!jsonToken) return [3 /*break*/, 2];
                            token = JSON.parse(jsonToken);
                            return [4 /*yield*/, axios.get(baseUrl + "/match/" + idMatch, {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token)
                                    }
                                })];
                        case 1:
                            getMatch = _a.sent();
                            jsonUser = localStorage.getItem("user");
                            if (jsonUser) {
                                user = JSON.parse(jsonUser);
                                photoUrl = user.player === "PLAYER_ONE" ? getMatch.data.photoPlayerTwo : getMatch.data.photoPlayerOne;
                                setAdversaryPhoto(photoUrl);
                            }
                            setScoreboard({
                                playerOne: getMatch.data.numberOfWinsPlayerOne,
                                playerTwo: getMatch.data.numberOfWinsPlayerTwo,
                                draws: getMatch.data.numberOfDraws
                            });
                            setInfoMatch(getMatch.data);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.error("error match ", e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        if (match === "online") {
            setPauseMatch(true);
            getInfoPlayer();
            getInfoMatch();
        }
    }, []);
    useEffect(function () {
        return function () {
            if (ws) {
                cleanWs();
            }
        };
    }, []);
    useEffect(function () {
        return function () { };
    }, []);
    useEffect(function () {
        keepAlive();
        connectionMatch();
    }, []);
    useEffect(function () {
        if (match === "online" && pauseMatch) {
            var getBoard = function () {
                console.log("Atualizando board...");
                ws === null || ws === void 0 ? void 0 : ws.send("view board");
            };
            var intervalId_1 = setInterval(getBoard, 6000);
            // Limpeza para evitar vazamentos de memória
            return function () { return clearInterval(intervalId_1); };
        }
    });
    useEffect(function () {
        var photoLocalStorage = localStorage.getItem("photo_user");
        if (photoLocalStorage) {
            var photoJson = JSON.parse(photoLocalStorage);
            setPhoto(photoJson.photo);
        }
    }, []);
    useEffect(function () {
        if (!playerVictory.open && turnPlayer && match === "single_player") {
            machineMove();
        }
    }, [turnPlayer]);
    // estabelece uma coneção com o websockets
    function connectionMatch() {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, newWs_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(match === "online" && !ws)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post("".concat(baseUrl, "/ticket/").concat(idMatch))];
                    case 2:
                        ticket = (_a.sent()).data.ticket;
                        newWs_1 = new WebSocket("ws://localhost:8080/match?server=" + idMatch + "&ticket=" + ticket);
                        newWs_1.onopen = function () {
                            console.log('Connected to WebSocket server');
                            keepAlive();
                            setStatusOnlie({ loading: false, text: "" });
                            newWs_1.send("view board");
                        };
                        newWs_1.onerror = function (error) {
                            console.log();
                            console.error('WebSocket Error:', error);
                            setStatusOnlie({ loading: true, text: "Erro ao carregar tabuleiro, aguarde" });
                            setTimeout(function () {
                                connectionMatch();
                                newWs_1.send("view board");
                            }, 1000); // Tentar reconectar após 1 segundos
                            newWs_1.send("view board");
                        };
                        newWs_1.onclose = function () {
                            console.log('Disconnected from WebSocket server');
                            setStatusOnlie({ loading: true, text: "Conexão fraca, aguarde" });
                            setTimeout(function () {
                                connectionMatch();
                                newWs_1.send("view board");
                            }, 1000); // Tentar reconectar após 1 segundos
                            // cleanWs();
                        };
                        onMessage(newWs_1);
                        setWs(newWs_1);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error("Erro ao conectar no servidor, ", e_2);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (ws) {
                            onMessage(ws);
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    // respota PONG com o websockets
    function keepAlive() {
        if (ws) {
            ws.send('ping');
            setTimeout(keepAlive, 3000); // Enviar ping a cada 30 segundos
        }
    }
    function handleMovePlayer(row, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(match === "vs_player")) return [3 /*break*/, 1];
                        move(row, index);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(match === "single_player" && !turnPlayer)) return [3 /*break*/, 3];
                        return [4 /*yield*/, move(row, index)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (match === "online" && !statusOnlie.loading) {
                            moveOnline(row, index);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function victoryCondition(player, currentBoard) {
        currentBoard = currentBoard ? currentBoard : board;
        // verifca linhas
        for (var i = 1; i <= 3; i++) {
            var rowKey = "row_".concat(i);
            if (currentBoard[rowKey][0] === player &&
                currentBoard[rowKey][1] === player &&
                currentBoard[rowKey][2] === player) {
                handleVitctory(player);
                return true;
            }
        }
        // Verifica colunas
        for (var j = 0; j < 3; j++) {
            if (currentBoard["row_1"][j] === player &&
                currentBoard["row_2"][j] === player &&
                currentBoard["row_3"][j] === player) {
                handleVitctory(player === "PLAYER_ONE" ? "PLAYER_ONE" : "PLAYER_TWO");
                return true;
            }
        }
        // Verifica diagonais
        if ((currentBoard["row_1"][0] === player && currentBoard["row_2"][1] === player && currentBoard["row_3"][2] === player) ||
            (currentBoard["row_1"][2] === player && currentBoard["row_2"][1] === player && currentBoard["row_3"][0] === player)) {
            handleVitctory(player);
            return true;
        }
        // verifica se deu velha
        else if (currentBoard.row_1.indexOf("NO_PLAYER") < 0 && currentBoard.row_2.indexOf("NO_PLAYER") < 0 && currentBoard.row_3.indexOf("NO_PLAYER") < 0) {
            handleVitctory("DRAW");
            return true;
        }
        return;
    }
    function handleVitctory(player) {
        return __awaiter(this, void 0, void 0, function () {
            var finallyMatch, result, tokenJson, token, data, match_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finallyMatch = scoreboard;
                        result = player === "PLAYER_ONE" ?
                            "PLAYER_ONE" :
                            player === "PLAYER_TWO" ?
                                "PLAYER_TWO" :
                                "DRAW";
                        switch (player) {
                            case "PLAYER_ONE": {
                                finallyMatch.playerOne++;
                                break;
                            }
                            case "PLAYER_TWO": {
                                finallyMatch.playerTwo++;
                                break;
                            }
                            default: {
                                finallyMatch.draws++;
                                break;
                            }
                        }
                        if (!(match === "online")) return [3 /*break*/, 3];
                        tokenJson = localStorage.getItem("token");
                        if (!tokenJson) return [3 /*break*/, 2];
                        setPauseMatch(false);
                        token = JSON.parse(tokenJson);
                        data = void 0;
                        switch (player) {
                            case "PLAYER_ONE": {
                                data = "PLAYER_ONE";
                                break;
                            }
                            case "PLAYER_TWO": {
                                data = "PLAYER_TWO";
                                break;
                            }
                            default: {
                                data = "DRAW";
                                break;
                            }
                        }
                        return [4 /*yield*/, axios.post("".concat(baseUrl, "/match/").concat(idMatch), {
                                victory: data
                            }, {
                                'headers': {
                                    "Authorization": "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        match_1 = _a.sent();
                        setScoreboard({
                            playerOne: match_1.data.numberOfWinsPlayerOne,
                            playerTwo: match_1.data.numberOfWinsPlayerTwo,
                            draws: match_1.data.numberOfDraws
                        });
                        setPlayerVictory({ open: true, player: result });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        setScoreboard(finallyMatch);
                        setPlayerVictory({ open: true, player: result });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /*
     
    movimentos dos jogadores
     
    */
    function moveOnline(row, index) {
        return __awaiter(this, void 0, void 0, function () {
            var data, jsonData;
            return __generator(this, function (_a) {
                if (!infoMatch)
                    return [2 /*return*/];
                if ((player === null || player === void 0 ? void 0 : player.player) === "PLAYER_ONE" && !turnPlayer)
                    return [2 /*return*/];
                if ((player === null || player === void 0 ? void 0 : player.player) === "PLAYER_TWO" && turnPlayer)
                    return [2 /*return*/];
                switch (row) {
                    case "row_1":
                        if (board.row_1[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        break;
                    case "row_2":
                        if (board.row_2[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        break;
                    case "row_3":
                        if (board.row_3[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        break;
                }
                data = {
                    row: parseInt(row.split("")[row.length - 1]) - 1,
                    column: index,
                    id: turnPlayer ? infoMatch.idPlayerOne : infoMatch.idPlayerTwo,
                    player: player === null || player === void 0 ? void 0 : player.player,
                };
                try {
                    jsonData = JSON.stringify(data);
                    ws === null || ws === void 0 ? void 0 : ws.send(jsonData);
                }
                catch (error) {
                    console.error("Erro ao enviar dados:", error);
                }
                return [2 /*return*/];
            });
        });
    }
    function move(row, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (row) {
                    case "row_1": {
                        if (board.row_1[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        board.row_1[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";
                        break;
                    }
                    case "row_2": {
                        if (board.row_2[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        board.row_2[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";
                        break;
                    }
                    case "row_3": {
                        if (board.row_3[index] !== "NO_PLAYER")
                            return [2 /*return*/];
                        board.row_3[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";
                        break;
                    }
                    default: {
                        console.error("Invalid field");
                        break;
                    }
                }
                setBoard(board);
                victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                setTurnPlayer(!turnPlayer);
                return [2 /*return*/];
            });
        });
    }
    function machineMove() {
        return __awaiter(this, void 0, void 0, function () {
            var availableFields, row, col, field, randomIndex, _a, row_4, col_1;
            return __generator(this, function (_b) {
                if (playerVictory.open) {
                    console.log("Jogo já finalizado, máquina não fará jogada.");
                    return [2 /*return*/];
                }
                availableFields = [];
                for (row = 1; row <= 3; row++) {
                    for (col = 0; col < 3; col++) {
                        field = board["row_".concat(row)][col];
                        if (field === "NO_PLAYER") {
                            availableFields.push({ row: row, col: col });
                        }
                    }
                }
                if (availableFields.length > 0) {
                    randomIndex = Math.floor(Math.random() * availableFields.length);
                    _a = availableFields[randomIndex], row_4 = _a.row, col_1 = _a.col;
                    setTimeout(function () {
                        board["row_".concat(row_4)][col_1] = "PLAYER_ONE";
                        setBoard(board);
                        victoryCondition("PLAYER_ONE");
                        setTurnPlayer(false);
                    }, 500);
                }
                else {
                    console.error("Não há campos disponíveis.");
                }
                return [2 /*return*/];
            });
        });
    }
    // outras funções 
    function realodMatch() {
        setBoard(initialBoard);
    }
    function nextMatch() {
        if (match === "single_player") {
            setTurnPlayer(false);
        }
        else if (match === "online") {
            ws === null || ws === void 0 ? void 0 : ws.send("reset board");
            setPauseMatch(false);
        }
        setPlayerVictory({ open: false, player: "DRAW" });
        setBoard(initialBoard);
    }
    // function navigateHome() {
    //     navigate("/", { replace: true });
    // }
    function onMessage(currentWs) {
        currentWs.onmessage = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var data, jsonBoard, boardData;
                return __generator(this, function (_a) {
                    try {
                        data = void 0;
                        // Tentar parsear como JSON primeiro
                        try {
                            data = JSON.parse(event.data);
                        }
                        catch (error) {
                            // Se falhar, assumir que é uma string simples
                            data = event.data;
                        }
                        if (typeof data === 'string' && data.toLowerCase() === 'ping') {
                            // Enviar pong como resposta ao ping
                            console.log("ping");
                            currentWs.send('pong');
                            return [2 /*return*/];
                        }
                        if (typeof data === 'string' && data.toLowerCase() === "standing game") {
                            return [2 /*return*/];
                        }
                        if (typeof data === 'string' && data.toLowerCase() === "match was ended") {
                            connectionMatch();
                        }
                        if (typeof data === 'string' && data.toLowerCase() === "close match") {
                            toast.dismiss();
                            toast.warn("Partida fechada", { autoClose: 1500 });
                            // currentWs.close();
                            ws === null || ws === void 0 ? void 0 : ws.close();
                            navigate("/menu_match_online", {
                                replace: true
                            });
                            setWs(null);
                            return [2 /*return*/];
                        }
                        if (typeof data === 'object' && data.board && data.PlayerSTurn) {
                            jsonBoard = data.board;
                            boardData = {
                                row_1: jsonBoard.rows_1,
                                row_2: jsonBoard.rows_2,
                                row_3: jsonBoard.rows_3
                            };
                            setBoard(boardData);
                            setTurnPlayer(data.PlayerSTurn === "PLAYER_ONE");
                            victoryCondition((data.PlayerSTurn !== "PLAYER_ONE") ? "PLAYER_ONE" : "PLAYER_TWO", boardData);
                        }
                        else {
                            console.error("Invalid message structure:", event.data);
                            return [2 /*return*/];
                        }
                    }
                    catch (error) {
                        console.error("Error parsing message:", error);
                    }
                    return [2 /*return*/];
                });
            });
        };
    }
    function cleanWs() {
        if (ws) {
            // ws.send("match closed");
            // ws.close();
        }
        setWs(null);
        setBoard(initialBoard);
    }
    function closeOnline() {
        if (ws) {
            ws.send("close match");
        }
    }
    function onCloseInfoAdversary() {
        setInfoAdversaryToggle(false);
    }
    function navigatePage(url) {
        if (url === "/info_user") {
            var jsonToken = localStorage.getItem("token");
            if (jsonToken) {
                navigate(url, { replace: true });
            }
            else {
                toast.warn("Não foi encontrado um token", { autoClose: 1200 });
                return;
            }
        }
        navigate(url, { replace: true });
    }
    return (_jsxs(Styled.Container, { children: [match === "online" && infoAdversaryToggle && infoMatch && player && (_jsx(_Fragment, { children: _jsx(InfoAdversary, { id: player.player === "PLAYER_ONE" ? infoMatch.idPlayerTwo : infoMatch.idPlayerOne, photo: adversaryPhoto ? adversaryPhoto : null, onclose: onCloseInfoAdversary }) })), playerVictory.open && (_jsx(_Fragment, { children: _jsx(ModalVictoryMatch, { victory: playerVictory, close: nextMatch }) })), statusOnlie.loading && match === "online" && (_jsx(_Fragment, { children: _jsxs("h1", { children: [statusOnlie.text, "..."] }) })), _jsxs(Styled.Header, { children: [_jsx(Audio, { music: boardMusic }), match !== "online" && (_jsx(Styled.ImgUser, { onClick: function () { return navigatePage("/info_user"); }, src: photo ? photo : imgNoUser, alt: "foto do usuario" }))] }), _jsxs(Styled.ContainerBoard, { children: [_jsxs(Styled.OptionMatch, { children: [match !== "online" ? (_jsx(_Fragment, { children: _jsx(Styled.Logo, { children: _jsx("img", { src: logoImg, alt: "logo do site", onClick: function () { return navigatePage("/"); } }) }) })) : (_jsx(_Fragment, { children: _jsx(Styled.Logo, { children: _jsx("img", { src: (player === null || player === void 0 ? void 0 : player.player) === "PLAYER_ONE" ? iconO : iconX, alt: "icone das pe\u00E7as", onClick: closeOnline }) }) })), _jsx(Reveal, { y: -30, duration: .3, children: _jsx(Link, { to: "scoreboard", spy: true, smooth: true, duration: 500, children: _jsxs(Styled.Turn, { children: [_jsx("img", { src: turnPlayer ? IconOTurn : IconXTurn, alt: "de quem \u00E9 o turno" }), "VEZ"] }) }) }), match !== "online" ? (_jsx(_Fragment, { children: _jsx(Link, { to: "board", spy: true, smooth: true, duration: 500, children: _jsx(Button, { btn: 'BUTTON_SILVER', option: "small", onClick: realodMatch, children: _jsx("img", { src: iconRestart, alt: "icone de restart" }) }) }) })) : (_jsx(_Fragment, { children: adversaryPhoto ? (_jsx(_Fragment, { children: _jsx(Styled.AdversaryPhoto, { onClick: function () { return setInfoAdversaryToggle(!infoAdversaryToggle); }, children: _jsx("img", { src: adversaryPhoto, alt: "photo another player" }) }) })) : (_jsx(_Fragment, { children: _jsx(Styled.AdversaryPhoto, { onClick: function () { return setInfoAdversaryToggle(!infoAdversaryToggle); }, children: _jsx("img", { src: imgNoUser, alt: "photo another player" }) }) })) }))] }), _jsx(Styled.Board, { id: "board", children: _jsxs("ul", { children: [board.row_1.map(function (field, index) { return (_jsx(Reveal, { y: -20, duration: .3, delay: parseFloat(".".concat(index + 2)), children: _jsx(Styled.Field, { player: field, onClick: function () { return handleMovePlayer("row_1", index); }, children: field === "NO_PLAYER" ? (_jsx(_Fragment, { children: turnPlayer ?
                                                _jsx("img", { src: iconOEmptyField, alt: "icone O ausente" }) :
                                                _jsx("img", { src: iconXEmptyField, alt: "icone X ausente" }) })) : (_jsx(_Fragment, { children: field === "PLAYER_ONE" ?
                                                _jsx("img", { src: iconO, alt: "icone O" }) :
                                                _jsx("img", { src: iconX, alt: "icone X" }) })) }) }, index + "ro1")); }), board.row_2.map(function (field, index) { return (_jsx(Reveal, { y: -25, duration: .3, delay: parseFloat(".".concat(index + 4)), children: _jsx(Styled.Field, { player: field, onClick: function () { return handleMovePlayer("row_2", index); }, children: field === "NO_PLAYER" ? (_jsx(_Fragment, { children: turnPlayer ?
                                                _jsx("img", { src: iconOEmptyField, alt: "icone O ausente" }) :
                                                _jsx("img", { src: iconXEmptyField, alt: "icone X ausente" }) })) : (_jsx(_Fragment, { children: field === "PLAYER_ONE" ?
                                                _jsx("img", { src: iconO, alt: "icone O" }) :
                                                _jsx("img", { src: iconX, alt: "icone X" }) })) }) }, index + "ro2")); }), board.row_3.map(function (field, index) { return (_jsx(Reveal, { y: -30, duration: .3, delay: parseFloat(".".concat(index + 5)), children: _jsx(Styled.Field, { player: field, onClick: function () { return handleMovePlayer("row_3", index); }, children: field === "NO_PLAYER" ? (_jsx(_Fragment, { children: turnPlayer ?
                                                _jsx("img", { src: iconOEmptyField, alt: "icone O ausente" }) :
                                                _jsx("img", { src: iconXEmptyField, alt: "icone X ausente" }) })) : (_jsx(_Fragment, { children: field === "PLAYER_ONE" ?
                                                _jsx("img", { src: iconO, alt: "icone O" }) :
                                                _jsx("img", { src: iconX, alt: "icone X" }) })) }) }, index + "ro3")); })] }) }), _jsxs(Styled.Scoreboard, { id: "scoreboard", children: [_jsxs(Button, { btn: "BUTTON_BLUE", option: "small", borderbottom: "no_board", hoverstyle: "no_hover_style", children: ["X (P2)", _jsxs("strong", { children: [" ", scoreboard.playerTwo > 0 ? scoreboard.playerTwo : 0, " "] })] }), _jsxs(Button, { btn: "BUTTON_SILVER", option: "small", borderbottom: "no_board", hoverstyle: "no_hover_style", children: ["VELHAS", _jsxs("strong", { children: [" ", scoreboard.draws > 0 ? scoreboard.draws : 0, " "] })] }), _jsxs(Button, { btn: "BUTTON_YALLOW", option: "small", borderbottom: "no_board", hoverstyle: "no_hover_style", children: ["O (P1)", _jsxs("strong", { children: [" ", scoreboard.playerOne > 0 ? scoreboard.playerOne : 0, " "] })] })] })] })] }));
}
export default Home;
