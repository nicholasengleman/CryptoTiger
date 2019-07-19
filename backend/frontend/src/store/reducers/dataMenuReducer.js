import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";

const initialState = {
    dataMenu: {
        open: false,
        column_id: "",
        timeframes: {
            hours: 18,
            days: 30,
            weeks: 52
        }
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
            ...state.dataMenu,
            open: menu_state,
            column_id: action.column_id ? action.column_id : "ADD_NEW_COLUMN"
        }
    };
    return updatedObject(state, updatedState);
};

const closeDataMenu = (state, action) => {
    const updatedState = {
        dataMenu: {
            ...state.dataMenu,
            open: false,
            column_id: 0
        }
    };
    return updatedObject(state, updatedState);
};


const dataMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DATA_MENU:
            return toggleDataMenu(state, action);
        case actionTypes.CLOSE_DATA_MENU:
            return closeDataMenu(state, action);
        default:
            return state;
    }
};

export default dataMenuReducer;
