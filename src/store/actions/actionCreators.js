import * as actionTypes from "./actionTypes";

// action creators
export const toggleDataMenu = (column_id) => {
  return {
    type: actionTypes.TOGGLE_DATA_MENU,
    column_id: column_id
  };
};

export const closeDataMenu = () => {
  return {
    type: actionTypes.CLOSE_DATA_MENU
  }
}

export const changeColumnData = data_id => {
  return {
    type: actionTypes.CHANGE_COLUMN_DATA,
    data_id: data_id
  };
};


export const fetchCryptosBegin = () => ({
  type: actionTypes.FETCH_CRYPTOS_BEGIN
});

export const fetchCryptosSucess = ( cryptos) => ({
  type: actionTypes.FETCH_CRYPTOS_SUCCESS,
  payload: { cryptos }
});

export const fetchCryptosFailure = ( error ) => ({
  type: actionTypes.FETCH_CRYPTOS_FAILURE,
  payload: { error }
});