import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";

const initialState = {
    data: [],
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

        let default_data = action.payload.data[0];

        default_data.forEach(crypto => {
            crypto.columns = [];

            for (let i = 1; i < action.payload.data.length; i++) {
                action.payload.data[i].data.forEach(crypto_tf => {
                    if (crypto_tf.crypto_id === crypto.crypto_id) {

                        crypto.columns.push(
                            {
                                name: action.payload.data[i].name,
                                period: action.payload.data[i].period,
                                crypto_datetime: crypto_tf.crypto_datetime,
                                crypto_id: crypto_tf.crypto_id,
                                crypto_value: crypto_tf.data_value
                            }
                        )
                    }
                });
            }
        });

        const updatedState = {
            loading: false,
            data: default_data
        };

        return updatedObject(state, updatedState);
    }
;

const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false,
        error: true,
        data: []
    };
    return updatedObject(state, updatedState);
};

const cryptoDataReducer = (state = initialState, action) => {
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

export default cryptoDataReducer;
