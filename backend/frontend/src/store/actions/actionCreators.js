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
export const toggleDataMenu = columnId => {
    return {
        type: actionTypes.TOGGLE_DATA_MENU,
        columnId: columnId
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

export const setSelectedDataPeriod = dataPeriod => {
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

export const updateCurrentData = newData => {
    return {
        type: actionTypes.UPDATE_CURRENT_DATA,
        payload: { newData }
    };
};

export const resetCryptoBuffer = () => {
    return {
        type: actionTypes.RESET_CRYPTO_BUFFER
    };
};

export const emptyData = () => {
    return {
        type: actionTypes.EMPTY_DATA
    };
};

export const processNewColumnData = (
    responseData,
    selectedColumnId,
    processForHistogram,
    dataType,
    dataGroup,
    dataPeriod,
    dataName
) => {
    return {
        type: actionTypes.PROCESS_NEW_COLUMN_DATA,
        payload: { responseData, selectedColumnId, processForHistogram, dataType, dataGroup, dataPeriod, dataName }
    };
};

export const updateLiveColumnView = () => {
    return {
        type: actionTypes.UPDATE_LIVE_COLUMN_VIEW
    };
};
export const processDataFromStoreForHistogram = currentSelectedColumn => {
    return {
        type: actionTypes.PROCESS_DATA_FROM_STORE_FOR_HISTOGRAM,
        payload: { currentSelectedColumn }
    };
};

// Crypto Menu action creators
export const fetchCryptosSuccess = data => {
    let columnIds = [];
    for (let i = 0; i <= 100; i++) {
        if (i === 0) {
            columnIds.push(0);
        } else {
            columnIds.push(columnIds[i - 1] + 1);
        }
    }
    return {
        type: actionTypes.FETCH_CRYPTOS_SUCCESS,
        payload: { data, columnIds }
    };
};
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
