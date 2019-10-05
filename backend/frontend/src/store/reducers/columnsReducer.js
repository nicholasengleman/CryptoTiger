import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";

const initialState = {
    column_visibility: []
};

const setColumns = (state, action) => {
    const updatedState = {
        column_visibility: Array(action.payload.columns - 1).fill(true)
    };

    return updatedObject(state, updatedState);
};

const setColumnsThatAreVisible = (state, action) => {
    let visibleColumns = action.payload.visibleColumns;
    let new_columns_array = Array(state.column_visibility.length).fill(true);

    if (visibleColumns >= new_columns_array.length) {
        visibleColumns = new_columns_array.length;
    }

    const updatedState = {
        column_visibility: new_columns_array.fill(false, visibleColumns)
    };
    return updatedObject(state, updatedState);
};

const addColumn = (state, action) => {
    let newColumn_visibility = state.column_visibility.slice(0);
    newColumn_visibility.push(true);

    const updatedState = {
        column_visibility: newColumn_visibility
    };

    return updatedObject(state, updatedState);
};

const removeColumn = (state, action) => {
    let newColumn_visibility = state.column_visibility.slice(0);
    newColumn_visibility.splice(action.payload.columnIndex, 1);

    const updatedState = {
        column_visibility: newColumn_visibility
    };
    return updatedObject(state, updatedState);
};

const shiftVisibleColumnsForwards = (state, action) => {
    let column_visibility = state.column_visibility.splice(0);

    let leftIndex = 0;

    for (let i = 0; i < column_visibility.length; i++) {
        if (column_visibility[i] === true) {
            column_visibility[i] = false;
            leftIndex = i;
            break;
        }
    }

    for (let i = 0; i < column_visibility.length; i++) {
        if (column_visibility[i] === false && leftIndex < i) {
            column_visibility[i] = true;
            break;
        }
    }

    const updatedState = { column_visibility };
    return updatedObject(state, updatedState);
};

const shiftVisibleColumnsBackwards = (state, action) => {
    let column_visibility = state.column_visibility.splice(0);
    let leftIndex = 0;

    for (let i = 0; i < column_visibility.length; i++) {
        if (column_visibility[i] === true) {
            column_visibility[i - 1] = true;
            leftIndex = i - 1;
            break;
        }
    }

    for (let i = 0; i <= column_visibility.length; i++) {
        if ((column_visibility[i] === false && leftIndex < i) || i === column_visibility.length) {
            column_visibility[i - 1] = false;
            break;
        }
    }

    const updatedState = { column_visibility };
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
        case actionTypes.SHIFT_VISIBLE_COLUMNS_FORWARD:
            return shiftVisibleColumnsForwards(state, action);
        case actionTypes.SHIFT_VISIBLE_COLUMNS_BACKWARDS:
            return shiftVisibleColumnsBackwards(state, action);
        default:
            return state;
    }
};

export default columnsReducer;
