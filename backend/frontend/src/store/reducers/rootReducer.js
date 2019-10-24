import { combineReducers } from "redux";
import dataMenuReducer from "./dataMenuReducer";
import cryptoDataReducer from "./cryptoDataReducer";
import columnsReducer from "./columnsReducer";
import selectedDataReducer from "./selectedDataReducer";
import filterReducer from "./filterReducer";
import presetsReducer from "./presetsReducer";

export default combineReducers({
    dataMenu: dataMenuReducer,
    cryptoData: cryptoDataReducer,
    columns: columnsReducer,
    selectedData: selectedDataReducer,
    filterData: filterReducer,
    presetsData: presetsReducer
});
