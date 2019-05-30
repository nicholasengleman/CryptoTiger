import { combineReducers } from "redux";
import dataMenu from "./dataMenu";
import cryptoData from "./cryptoData";

export default combineReducers({
    dataMenu, cryptoData
});