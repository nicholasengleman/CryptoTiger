import { getAllCryptos, getDefaultColumns } from "./../../Services/cryptos";
import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";

const initialState = {
    columns: getDefaultColumns(),
    cryptos: getAllCryptos(),
    dataMenu: {
        open: false,
        column_id: 8
    }
};

const toggleDataMenu = (state, action) => {
    let menu_state = "";
    if (state.dataMenu.column_id === action.column_id) {
        menu_state = !state.dataMenu.open;
    } else {
        menu_state = true;
    }
    const updatedState = {
        dataMenu: {
            open: menu_state,
            column_id: action.column_id
        }
    };
    return updatedObject(state, updatedState);
};

const closeDataMenu = (state, action) => {
    const updatedState = {
        dataMenu: {
            open: false,
            column_id: 0
        }
    };

    return updatedObject(state, updatedState);
}

const changeColumnData = (state, action) => {
    const columns = [...state.columns];
    let dataMenu = {...state.dataMenu};

    columns.forEach(function (column) {
        if (column.data_id === state.dataMenu.column_id) {
            column.data_id = action.data_id;
            dataMenu.column_id = action.data_id;
        }
    });

    const updatedState = {
        columns,
        dataMenu
    };

    return updatedObject(state, updatedState);
};

const dataMenu = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DATA_MENU:
            return toggleDataMenu(state, action);
        case actionTypes.CLOSE_DATA_MENU:
            return closeDataMenu(state, action);
        case actionTypes.CHANGE_COLUMN_DATA:
            return changeColumnData(state, action);
        default:
            return state;
    }
};

export default dataMenu;
