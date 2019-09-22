import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";

const initialState = {
    columns: []
};

const setColumns = (state, action) => {
    const updatedState = {
        columns: Array(action.payload.columns).fill(true)
    };

    return updatedObject(state, updatedState);
};

const setColumnsThatAreVisible = (state, action) => {
    let visibleColumns = action.payload.visibleColumns;

    const updatedState = {
        columns: state.columns.fill(false, visibleColumns)
    };
    return updatedObject(state, updatedState);
};

const addColumn = (state, action) => {
    const updatedState = {};
    return updatedObject(state, updatedState);
};

const removeColumn = (state, action) => {
    const updatedState = {};
    return updatedObject(state, updatedState);
};

const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COLUMN:
            return addColumn(state, action);
        case actionTypes.REMOVE_COLUMN:
            return removeColumn(state, action);
        case actionTypes.SET_COLUMNS:
            return setColumns(state, action);
        case actionTypes.SET_COLUMNS_THAT_ARE_VISIBLE:
            return setColumnsThatAreVisible(state, action);
        default:
            return state;
    }
};

export default columnsReducer;
