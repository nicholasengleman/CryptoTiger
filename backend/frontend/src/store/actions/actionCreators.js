import * as actionTypes from "./actionTypes";


// Data Menu action creators
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


//Crypto Data Managing creators
export const closeDataMenu = () => {
  return {
    type: actionTypes.CLOSE_DATA_MENU
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
  }
};
export const getCurrentSelectedColumn = (current_selected_column) => {
  return {
    type: actionTypes.GET_CURRENT_SELECTED_COLUMN,
    payload: { current_selected_column }
  };
};


// Crypto Menu action creators
export const fetchCryptosBegin = () => ({
  type: actionTypes.FETCH_CRYPTOS_BEGIN
});
export const fetchCryptosSuccess = data => ({
  type: actionTypes.FETCH_CRYPTOS_SUCCESS,
  payload: { data }
});
export const fetchCryptosFailure = error => ({
  type: actionTypes.FETCH_CRYPTOS_FAILURE,
  payload: { error }
});
