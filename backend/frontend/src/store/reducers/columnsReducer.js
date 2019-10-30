import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";

const initialState = {
    columnVisibility: []
};

const setColumns = (state, action) => {
    const updatedState = {
        columnVisibility: Array(action.payload.columns - 1).fill(true)
    };

    return updatedObject(state, updatedState);
};

const setColumnsThatAreVisible = (state, action) => {
    console.log("fired");
    let visibleColumns = action.payload.visibleColumns;
    let newColumnsArray = Array(state.columnVisibility.length).fill(true);

    if (visibleColumns >= newColumnsArray.length) {
        visibleColumns = newColumnsArray.length;
    }

    const updatedState = {
        columnVisibility: newColumnsArray.fill(false, visibleColumns)
    };
    return updatedObject(state, updatedState);
};

const addColumn = (state, action) => {
    let newColumnVisibility = state.columnVisibility.slice(0);
    newColumnVisibility.push(true);

    const updatedState = {
        columnVisibility: newColumnVisibility
    };

    return updatedObject(state, updatedState);
};

const removeColumn = (state, action) => {
    let newColumnVisibility = state.columnVisibility.slice(0);
    newColumnVisibility.splice(action.payload.columnIndex, 1);

    const updatedState = {
        columnVisibility: newColumnVisibility
    };
    return updatedObject(state, updatedState);
};

const shiftVisibleColumnsForwards = (state, action) => {
    let columnVisibility = state.columnVisibility.splice(0);

    let leftIndex = 0;

    for (let i = 0; i < columnVisibility.length; i++) {
        if (columnVisibility[i] === true) {
            columnVisibility[i] = false;
            leftIndex = i;
            break;
        }
    }

    for (let i = 0; i < columnVisibility.length; i++) {
        if (columnVisibility[i] === false && leftIndex < i) {
            columnVisibility[i] = true;
            break;
        }
    }

    const updatedState = { columnVisibility };
    return updatedObject(state, updatedState);
};

const shiftVisibleColumnsBackwards = (state, action) => {
    let columnVisibility = state.columnVisibility.splice(0);
    let leftIndex = 0;

    for (let i = 0; i < columnVisibility.length; i++) {
        if (columnVisibility[i] === true) {
            columnVisibility[i - 1] = true;
            leftIndex = i - 1;
            break;
        }
    }

    for (let i = 0; i <= columnVisibility.length; i++) {
        if ((columnVisibility[i] === false && leftIndex < i) || i === columnVisibility.length) {
            columnVisibility[i - 1] = false;
            break;
        }
    }

    const updatedState = { columnVisibility };
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
