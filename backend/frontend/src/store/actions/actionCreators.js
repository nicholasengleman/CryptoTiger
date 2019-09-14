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
export const setSelectedColumn = selectedColumn => {
    return {
        type: actionTypes.SET_SELECTED_COLUMN,
        payload: { selectedColumn }
    };
};

export const setSelectedTimeframe = selectedTimeframe => {
    return {
        type: actionTypes.SET_SELECTED_TIMEFRAME,
        payload: { selectedTimeframe }
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
export const addCrypto = (parameters, periodName) => ({
    type: actionTypes.ADD_CRYPTO,
    payload: { parameters, periodName }
});

export const removeCrypto = (periodName) => ({
    type: actionTypes.REMOVE_CRYPTO,
    payload: { periodName }
});
