import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";

const initialState = {
    columns: []
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