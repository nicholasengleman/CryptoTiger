import * as actionTypes from "./actionTypes";

//////////////////////////////////////
// Data Menu action creators
//////////////////////////////////////
export const loadInitialColumnData = data => {
    return {
        type: actionTypes.LOAD_INITIAL_COLUMN_DATA,
        payload: { data }
    };
};
export const toggleDataMenu = column_id => {
    return {
        type: actionTypes.TOGGLE_DATA_MENU,
        column_id: column_id
    };
};

///////////////////////////////
//Crypto Data Managing creators
/////////////////////////////////

export const setSelectedDataType = dataType => {
    return {
        type: actionTypes.SET_SELECTED_DATA_TYPE,
        payload: { dataType }
    };
};

export const setSelectedDataGroup = dataGroup => {
    return {
        type: actionTypes.SET_SELECTED_DATA_GROUP,
        payload: { dataGroup }
    };
};

export const setSelectedDataPeriod = (dataPeriod) => {
    return {
        type: actionTypes.SET_SELECTED_DATA_PERIOD,
        payload: { dataPeriod }
    };
};

export const setSelectedDataName = dataName => {
    return {
        type: actionTypes.SET_SELECTED_DATA_NAME,
        payload: { dataName }
    };
};

export const setSelectedColumnId = columnId => {
    return {
        type: actionTypes.SET_SELECTED_COLUMN_ID,
        payload: { columnId }
    };
};

export const removeSelectedColumnId = () => {
    return {
        type: actionTypes.REMOVE_SELECTED_COLUMN_ID
    };
};

export const closeDataMenu = () => {
    return {
        type: actionTypes.CLOSE_DATA_MENU
    };
};

export const updateCurrentData = new_data => {
    return {
        type: actionTypes.UPDATE_CURRENT_DATA,
        payload: { new_data }
    };
};

export const emptyHistogramData = () => {
    return {
        type: actionTypes.EMPTY_HISTOGRAM_DATA
    };
};

export const processNewColumnData = (new_timeframe_name, new_column_data) => {
    return {
        type: actionTypes.PROCESS_NEW_COLUMN_DATA,
        payload: { new_timeframe_name, new_column_data }
    };
};
export const updateLiveColumnView = () => {
    return {
        type: actionTypes.UPDATE_LIVE_COLUMN_VIEW
    };
};
export const processDataFromStoreForHistogram = current_selected_column => {
    return {
        type: actionTypes.PROCESS_DATA_FROM_STORE_FOR_HISTOGRAM,
        payload: { current_selected_column }
    };
};

// Crypto Menu action creators
export const fetchCryptosSuccess = data => ({
    type: actionTypes.FETCH_CRYPTOS_SUCCESS,
    payload: { data }
});
export const fetchCryptosFailure = error => ({
    type: actionTypes.FETCH_CRYPTOS_FAILURE,
    payload: { error }
});

///////////////////////////////
//Filter action creators
//////////////////////////////////
export const addFilter = (columnId, parameters) => ({
    type: actionTypes.ADD_FILTER,
    payload: { columnId, parameters }
});

export const editFilter = (columnId, parameters) => ({
    type: actionTypes.EDIT_FILTER,
    payload: { columnId, parameters }
});

export const removeFilter = columnId => ({
    type: actionTypes.REMOVE_FILTER,
    payload: { columnId }
});

export const addColumnData = () => ({
    type: actionTypes.ADD_COLUMN_DATA
});

export const editColumnData = () => ({
    type: actionTypes.EDIT_COLUMN_DATA
});

export const moveCryptoBufferToData = () => ({
    type: actionTypes.MOVE_CRYPTOBUFFER_TO_DATA
});

export const removeColumnData = columnId => ({
    type: actionTypes.REMOVE_COLUMN_DATA,
    payload: { columnId }
});

//////////////////////////////////////
// Column Action Creators
/////////////////////////////////////
export const addColumn = () => ({
    type: actionTypes.ADD_COLUMN
});
export const removeColumn = columnIndex => ({
    type: actionTypes.REMOVE_COLUMN,
    payload: { columnIndex }
});

export const setColumns = columns => ({
    type: actionTypes.SET_COLUMNS,
    payload: { columns }
});
export const setColumnsThatAreVisible = visibleColumns => ({
    type: actionTypes.SET_COLUMNS_THAT_ARE_VISIBLE,
    payload: { visibleColumns }
});

export const shiftVisibleColumnsForward = () => ({
    type: actionTypes.SHIFT_VISIBLE_COLUMNS_FORWARD
});

export const shiftVisibleColumnsBackwards = () => ({
    type: actionTypes.SHIFT_VISIBLE_COLUMNS_BACKWARDS
});
