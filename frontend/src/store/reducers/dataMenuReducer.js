import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";

const initialState = {
    dataMenu: {
        open: false,
        columnId: "",
        timeframes: {
            hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18],
            day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16]
        }
    }
};

const toggleDataMenu = (state, action) => {
    let menuState = "";
    if (state.dataMenu.columnId === action.columnId) {
        menuState = !state.dataMenu.open;
    } else {
        menuState = true;
    }

    const updatedState = {
        dataMenu: {
            ...state.dataMenu,
            open: menuState,
            columnId: action.columnId ? action.columnId : "ADD_NEW_COLUMN"
        }
    };
    return updatedObject(state, updatedState);
};

const closeDataMenu = (state, action) => {
    const updatedState = {
        dataMenu: {
            ...state.dataMenu,
            open: false,
            columnId: 0
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
