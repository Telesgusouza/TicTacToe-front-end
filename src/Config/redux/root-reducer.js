import { combineReducers } from "redux";
import UserReducer from "./UserReducer/reducer";
import WSReducer from "./WSReducer/reducer";
var rootReducer = combineReducers({ UserReducer: UserReducer, WSReducer: WSReducer });
export default rootReducer;
