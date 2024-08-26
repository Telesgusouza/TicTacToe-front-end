
import { combineReducers } from "redux";
import UserReducer from "./UserReducer/reducer";
import WSReducer from "./WSReducer/reducer";

const rootReducer = combineReducers({ UserReducer, WSReducer });

export default rootReducer;