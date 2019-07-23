import * as actionTypes from "../actions/actionTypes";
import {updatedObject, findCurrentValueOfCrypto} from "../../utilities/utilities";
import _ from "lodash";

const initialState = {
    data: [],
    currentData: [],
    loading: false,
    error: null,
    cryptoDataBuffer: [],
    selectedColumn: "",
    histogram_data: []
};


const updateLiveCryptoView = (state, action) => {
    const updatedState = {
        data: state.cryptoDataBuffer,
        cryptoDataBuffer: []
    };
    return updatedObject(state, updatedState);
};

const processNewColumnData = (state, action) => {
    // console.log(action.payload.new_column_data);

    let histogram_data = [];

    action.payload.new_column_data.forEach(crypto => {
        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto.crypto_id);
        const change_percentage = (((current_value - crypto.data_value) / crypto.data_value) * 100).toFixed(2);

        histogram_data.push({y: change_percentage, id: crypto.crypto_id});
    });

    histogram_data.sort(function (a, b) {
        return a.y - b.y;
    });

    let x0_count = 0;
    let x_count = 1;

    histogram_data.forEach(crypto => {
        crypto["x0"] = x0_count;
        crypto["x"] = x_count;
        x0_count++;
        x_count++;
    });

    let crypto_data_buffer = _.cloneDeep(state.data);
    action.payload.new_column_data.forEach(crypto => {
        let new_crypto_value;

        let index_of_el_to_change = crypto_data_buffer[crypto.crypto_id].columns.findIndex(function (arr) {
            return arr.name === state.selectedColumn;
        });
        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto.crypto_id);
        new_crypto_value = (((current_value - crypto.data_value) / crypto.data_value) * 100).toFixed(2);

        crypto_data_buffer[crypto.crypto_id].columns[index_of_el_to_change] = {
            name: action.payload.new_timeframe_name,
            crypto_datetime: crypto.crypto_datetime,
            crypto_id: crypto.crypto_id,
            crypto_value: new_crypto_value
        };
    });

    const updatedState = {
        cryptoDataBuffer: crypto_data_buffer,
        histogram_data
    };

    return updatedObject(state, updatedState);
};
const getCurrentSelectedColumn = (state, action) => {
    const updatedState = {
        selectedColumn: action.payload.current_selected_column
    };
    return updatedObject(state, updatedState);
};

const fetchCryptosBegin = (state, action) => {
    const updatedState = {
        loading: true,
        error: null
    };
    return updatedObject(state, updatedState);
};
const fetchCryptosSuccess = (state, action) => {
    let default_data = {};
    action.payload.data[0].forEach(crypto => {
        default_data[crypto.crypto_id] = {
            crypto_id: crypto.crypto_id,
            crypto_name: crypto.crypto_name,
            crypto_shortname: crypto.crypto_shortname,
            crypto_icon_url: crypto.crypto_icon_url

        }
    });

    Object.keys(default_data).forEach(crypto => {
        default_data[crypto].columns = [];
        let new_crypto_value;

        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach(crypto_tf => {

                    if (crypto_tf.crypto_id === default_data[crypto].crypto_id) {

                        if (i < 2) {
                            new_crypto_value = crypto_tf.data_value;
                        } else {
                            const current_value = findCurrentValueOfCrypto(action.payload.data[1].data, crypto_tf.crypto_id);
                            new_crypto_value = (((current_value - crypto_tf.data_value) / crypto_tf.data_value) * 100).toFixed(2);
                        }

                        default_data[crypto].columns.push(
                            {
                                name: action.payload.data[i].name,
                                period: action.payload.data[i].period,
                                crypto_datetime: crypto_tf.crypto_datetime,
                                crypto_id: crypto_tf.crypto_id,
                                crypto_value: new_crypto_value
                            }
                        )
                    }
                }
            );
        }
    })
    ;

    const updatedState = {
        loading: false,
        data: default_data,
        currentData: action.payload.data[1]
    };

    return updatedObject(state, updatedState);
};

const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false,
        error: true,
    };
    return updatedObject(state, updatedState);
};


const cryptoDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT_SELECTED_COLUMN:
            return getCurrentSelectedColumn(state, action);
        case actionTypes.PROCESS_NEW_COLUMN_DATA:
            return processNewColumnData(state, action);
        case actionTypes.UPDATE_LIVE_COLUMN_VIEW:
            return updateLiveCryptoView(state, action);
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
