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
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import * as Styled from './style';
import imgNoUser from '../../assets/no-user.svg';
import Button from '../Button';
import Reveal from '../Reveal';
import { toast } from 'react-toastify';
export default function InfoAdversary(_a) {
    var id = _a.id, photo = _a.photo, onclose = _a.onclose;
    var _b = useState(""), namePlayer = _b[0], setNamePlayer = _b[1];
    var _c = useState(false), isOnTheList = _c[0], setIsOnTheList = _c[1];
    useEffect(function () {
        function getInfoPlayer() {
            return __awaiter(this, void 0, void 0, function () {
                var jsonListFriends, jsonToken, listFriends, token, requestData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            jsonListFriends = localStorage.getItem("list_friends");
                            jsonToken = localStorage.getItem("token");
                            if (!jsonToken) return [3 /*break*/, 2];
                            listFriends = jsonListFriends ? JSON.parse(jsonListFriends) : [];
                            setIsOnTheList(!listFriends.find(function (r) { return r.idPlayer === id; }));
                            if (!!listFriends.find(function (r) { return r.idPlayer === id; })) return [3 /*break*/, 2];
                            token = JSON.parse(jsonToken);
                            return [4 /*yield*/, axios.get("".concat(baseUrl, "/user/").concat(id), {
                                    'headers': {
                                        'Authorization': "Bearer ".concat(token)
                                    }
                                })];
                        case 1:
                            requestData = _a.sent();
                            setNamePlayer(requestData.data.name);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("Error when searching for opposing player data: " + error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        getInfoPlayer();
    }, []);
    function btnAddListFriend() {
        return __awaiter(this, void 0, void 0, function () {
            var jsonToken, token, data, addData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        jsonToken = localStorage.getItem("token");
                        if (!jsonToken) return [3 /*break*/, 2];
                        token = JSON.parse(jsonToken);
                        data = {
                            name: namePlayer,
                            img: photo ? photo : null,
                            anotherPlayer: id
                        };
                        return [4 /*yield*/, axios.post("".concat(baseUrl, "/user"), data, {
                                'headers': {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        addData = _a.sent();
                        updateListFriends(addData.data);
                        setIsOnTheList(false);
                        toast.success("Adicionado aos amigos com sucesso");
                        setTimeout(function () {
                            onclose();
                        }, 200);
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        toast.error("Erro ao adicionar aos amigos");
                        console.error("Error > ", error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function updateListFriends(data) {
        var jsonList = localStorage.getItem("list_friends");
        var list = jsonList ? JSON.parse(jsonList) : [];
        list.push(data);
        localStorage.setItem("list_friends", JSON.stringify(list));
    }
    return (_jsx(Reveal, { y: -70, duration: .5, children: _jsxs(Styled.Container, { children: [_jsx("img", { src: photo ? photo : imgNoUser, alt: "" }), _jsxs("label", { htmlFor: "name", children: ["Nome", _jsx("strong", { children: namePlayer })] }), _jsxs("label", { htmlFor: "id", children: ["ID do oponente", _jsx("strong", { children: id })] }), isOnTheList && (_jsx(_Fragment, { children: _jsx(Button, { btn: 'BUTTON_SILVER', option: 'small', borderbottom: 'no_board', onClick: btnAddListFriend, children: "Adicionar aos amigos" }) }))] }) }));
}
