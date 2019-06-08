import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";
import _ from "lodash";

const initialState = {
  cryptos: [],
  loading: false,
  error: null
};

const fetchCryptosBegin = (state, action) => {
  const updatedState = {
    loading: true,
    error: null
  };
  return updatedObject(state, updatedState);
};

const fetchCryptosSuccess = (state, action) => {
  //if crypto array does not have crypto object with current crypto id, make new crypto object and put info there

  //if crypto array does have crypto object, put current data there

  const updatedState = {
    loading: false,
    cryptos: action.payload.cryptos
  };
  return updatedObject(state, updatedState);
};

const fetchCryptosFailure = (state, action) => {
  const updatedState = {
    loading: false,
    error: true,
    cryptos: []
  };
  return updatedObject(state, updatedState);
};

const cryptoData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CRYPTOS_BEGIN:
      return fetchCryptosBegin(state, action);
    case actionTypes.FETCH_CRYPTOS_SUCCESS:
      return fetchCryptosSuccess(state, action);
    case actionTypes.FETCH_CRYPTOS_FAILURE:
      return fetchCryptosFailure(state, action);
    default:
      return state;
  }
};

export default cryptoData;
