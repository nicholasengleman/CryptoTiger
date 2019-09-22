import { combineReducers } from "redux";
import dataMenuReducer from "./dataMenuReducer";
import cryptoDataReducer from "./cryptoDataReducer";
import columnsReducer from "./columnsReducer";

export default combineReducers({
    dataMenu: dataMenuReducer,
    cryptoData: cryptoDataReducer,
    columns: columnsReducer
});
