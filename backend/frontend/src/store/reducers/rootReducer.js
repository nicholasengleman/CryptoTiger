import { combineReducers } from "redux";
import dataMenuReducer from "./dataMenuReducer";
import cryptoDataReducer from "./cryptoDataReducer";


export default combineReducers({
    dataMenu: dataMenuReducer, cryptoData: cryptoDataReducer
});