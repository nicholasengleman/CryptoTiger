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
export const closeDataMenu = () => {
  return {
    type: actionTypes.CLOSE_DATA_MENU
  };
};
export const changeColumnData = (data_id, data_name) => {
  return {
    type: actionTypes.CHANGE_COLUMN_DATA,
    data_id: data_id,
    data_name: data_name
  };
};

// Crypto Menu action creators
export const fetchCryptosBegin = () => ({
  type: actionTypes.FETCH_CRYPTOS_BEGIN
});
export const fetchCryptosSuccess = cryptos => ({
  type: actionTypes.FETCH_CRYPTOS_SUCCESS,
  payload: { cryptos }
});
export const fetchCryptosFailure = error => ({
  type: actionTypes.FETCH_CRYPTOS_FAILURE,
  payload: { error }
});
