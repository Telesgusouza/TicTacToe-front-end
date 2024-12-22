
import { combineReducers } from "redux";
import UserReducer from "./UserReducer/reducer";
import WSReducer from "./WSReducer/reducer";
import SoundtrackReducer from './SoundtrackReducer/reducer';

const rootReducer = combineReducers({ UserReducer, WSReducer, SoundtrackReducer, });

export default rootReducer;