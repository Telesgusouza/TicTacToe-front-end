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
import ActionTypes from "../../ActionTypes";
var initialState = {
    user: {
        name: "",
        login: "",
        role: "",
        player: "",
        numberOfWins: 0,
        numberOfDefeats: 0,
        numberOfDraws: 0,
    }
};
var UserReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === ActionTypes.SAVE_USER) {
        return __assign(__assign({}, state), { user: action.payload });
    }
    return state;
};
export default UserReducer;
