import rootReducer from "./root-reducer";
import { configureStore } from '@reduxjs/toolkit';
var store = configureStore({
    reducer: rootReducer
});
export default store;
