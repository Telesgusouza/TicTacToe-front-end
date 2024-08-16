
import { combineReducers } from "redux";
import UserReducer from "./UserReducer/reducer";

const rootReducer = combineReducers({ UserReducer });

export default rootReducer;