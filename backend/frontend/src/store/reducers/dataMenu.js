import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";

const initialState = {
    columns: [],
    dataMenu: {
        open: false,
        column_id: ""
    }
};

const loadInitialColumnData = (state, action) => {
    let columns_processed = [];
    let id;

    let numberdata = [];

    for(let i = 1; i<action.payload.data.length; i++) {
        numberdata.push(action.payload.data[i])
    }

    const updatedState = {
        columns: numberdata
    };
    return updatedObject(state, updatedState);
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
            column_id: action.column_id ? action.column_id : "ADD_NEW_COLUMN"
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
};

const changeColumnData = (state, action) => {
    let columns = [...state.columns];
    let dataMenu = {...state.dataMenu};

    if (state.dataMenu.column_id !== 'ADD_NEW_COLUMN') {
        columns.forEach(function (column) {
            if (column.data_id === state.dataMenu.column_id) {
                column.data_id = action.data_id;
                column.data_name = action.data_name;
            }
        });
    } else {
        columns.push({data_id: action.data_id, data_name: action.data_name});
    }

    dataMenu.column_id = action.data_id;

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
        case actionTypes.LOAD_INITIAL_COLUMN_DATA:
            return loadInitialColumnData(state, action);
        default:
            return state;
    }
};

export default dataMenu;
