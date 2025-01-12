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
    ws: null
};
var WSReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === ActionTypes.WS_MATCH) {
        return __assign(__assign({}, state), { user: action.payload });
    }
    return state;
};
export default WSReducer;
