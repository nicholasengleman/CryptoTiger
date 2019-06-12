import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";

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
  let cryptos_processed = {};

  action.payload.cryptos.forEach(function(item) {
    if (!cryptos_processed[item.crypto_id]) {
      cryptos_processed[item.crypto_id] = {
        data: {
          [item.data_id]: {
            data_id: [item.data_id],
            data_name: [item.data_name],
            data_period_type: [item.data_period_type],
            data_period: [item.data_period],
            data_type: [item.data_type],
            data_value: item.data_value
          }
        }
      };
    } else {
      cryptos_processed[item.crypto_id] = {
        data: {
          ...cryptos_processed[item.crypto_id].data,
          [item.data_id]: {
            data_id: [item.data_id],
            data_name: [item.data_name],
            data_period_type: [item.data_period_type],
            data_period: [item.data_period],
            data_type: [item.data_type],
            data_value: item.data_value
          }
        }
      };
    }
  });

  const updatedState = {
    loading: false,
    cryptos: Array.from(Object.entries(cryptos_processed))
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
