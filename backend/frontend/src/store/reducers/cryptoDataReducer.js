import * as actionTypes from "../actions/actionTypes";
import { updatedObject, findCurrentValueOfCrypto, filterCryptos } from "../utilities/utilities";
import _ from "lodash";

const initialState = {
    // master copy of data
    allData: [],

    // buffer that will replace the allData object once the selections from the histogram have been filtered
    cryptoDataBuffer: [],

    // contains only 1 column of data for each crypto. This is the data that is passed to the histogram component
    histogramData: [],

    // contains the latest live data for each crypto
    currentData: [],

    loading: false,
};

/////////////////////
// Processes data retrieved from the database on initial page load
///////////////////////
const fetchCryptosSuccess = (state, action) => {
    let default_data = {},
        columnIds = [];

    console.log(action.payload.data);

    for (let i = 1; i <= 100; i++) {
        columnIds.push(Math.floor(Math.random() * 10000000) + 1);
    }

    action.payload.data[0].forEach(crypto => {
        default_data[crypto.crypto_id] = {
            crypto_id: crypto.crypto_id,
            crypto_name: crypto.crypto_name,
            crypto_period: crypto.crypto_period,
            crypto_shortname: crypto.crypto_shortname,
            crypto_icon_url: crypto.crypto_icon_url
        };
    });

    //creates an array of crypto objects, with each object having:
    // 1) the crypto id
    // 2) crypto name
    // 3) crypto symbol
    // 4) link to crypto icon
    // 5) array containing objects for each default column. Each of these objects contains:
    //      a) the name of the column
    //      b) the period
    //      c) the crypto id
    //      d) the value to display for this cell

    Object.keys(default_data).forEach(crypto => {
        default_data[crypto].columns = [];
        let cryptoValue, currentValue, percentage;

        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach((crypto_tf, index) => {
                if (crypto_tf.crypto_id === default_data[crypto].crypto_id) {
                    if (i < 2) {
                        cryptoValue = crypto_tf.data_value;
                        currentValue = crypto_tf.data_value;
                    } else {
                        if (crypto_tf.data_value) {
                            cryptoValue = (
                                ((currentValue - crypto_tf.data_value) / crypto_tf.data_value) *
                                100
                            ).toFixed(2);
                        } else {
                            cryptoValue = 0;
                        }
                    }

                    default_data[crypto].columns.push({
                        name: action.payload.data[i].name,
                        columnId: columnIds[i],
                        period: action.payload.data[i].period,
                        crypto_datetime: crypto_tf.crypto_datetime,
                        crypto_id: crypto_tf.crypto_id,
                        crypto_value: parseFloat(cryptoValue)
                    });
                }
            });
        }
    });

    const updatedState = {
        columnIds,
        loading: false,
        allData: default_data,
        currentData: action.payload.data[1]
    };

    return updatedObject(state, updatedState);
};

/////////////////////
// Fires if there was a failure when retrieving data on page load
///////////////////////
const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false,
    };
    return updatedObject(state, updatedState);
};

///////////////////
//Empties the Histogram Array when a new period is selected
//////////////////
const processDataFromStoreForHistogram = (state, action) => {
    let histogramData = [];
    const name_of_selected_column = action.payload.current_selected_column;

    for (let crypto in state.allData) {
        state.allData[crypto].columns.forEach(column => {
            if (column.name === name_of_selected_column) {
                histogramData.push({
                    id: column.crypto_id,
                    value: Number(column.crypto_value),
                    tooltip: {
                        name: state.allData[crypto].crypto_name,
                        value: column.crypto_value
                    }
                });
            }
        });
    }

    const updatedState = { histogramData };

    return updatedObject(state, updatedState);
};

const emptyHistogramData = (state, action) => {
    const updatedState = {
        histogramData: []
    };
    return updatedObject(state, updatedState);
};

const processNewColumnData = (state, action) => {
    let histogramData = [];

    //////////
    // 1. Calculates percentage and builds an array of objects of structure {id: cryptoid, value: percentage } to
    // pass to the histogram slider component
    //////////

    action.payload.new_column_data.forEach(crypto => {
        let percentage;

        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto.crypto_id);
        if (crypto.data_value) {
            percentage = (((current_value - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
        } else {
            percentage = 0;
        }

        histogramData.push({
            id: crypto.crypto_id,
            value: Number(percentage),
            tooltip: {
                name: state.allData[crypto.crypto_id].crypto_name,
                value: parseFloat(percentage)
            }
        });
    });

    ////////////////////////////////
    // 2. Builds new array of CryptoData that will replace the allData object once the selections from the histogram have been filtered
    /////////////////////////////////
    let crypto_data_buffer = _.cloneDeep(state.allData);
    action.payload.new_column_data.forEach(crypto => {
        let index_of_el_to_change, percentage;

        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto.crypto_id);
        if (crypto.data_value) {
            percentage = (((current_value - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
        } else {
            percentage = 0;
        }

        if (state.selectedColumnId === 0) {
            ////////
            //we are adding a new column
            ////////

            crypto_data_buffer[crypto.crypto_id].columns.push({
                name: action.payload.new_timeframe_name,
                columnId: state.columnIds[state.allData["1182"].columns.length + 1],
                period: state.selectedPeriod.dataPeriod,
                crypto_datetime: crypto.crypto_datetime,
                crypto_id: crypto.crypto_id,
                crypto_value: parseFloat(percentage)
            });
        } else {
            ///////
            //we are changing the data for an existing column
            ///////

            index_of_el_to_change = crypto_data_buffer[crypto.crypto_id].columns.findIndex(function(column) {
                return column.columnId === state.selectedColumnId;
            });

            crypto_data_buffer[crypto.crypto_id].columns[index_of_el_to_change] = {
                ...crypto_data_buffer[crypto.crypto_id].columns[index_of_el_to_change],
                name: action.payload.new_timeframe_name,
                crypto_period: crypto.crypto_period,
                crypto_datetime: crypto.crypto_datetime,
                crypto_id: crypto.crypto_id,
                crypto_value: String(percentage)
            };
        }
    });

    const updatedState = {
        cryptoDataBuffer: crypto_data_buffer,
        histogramData: histogramData
    };

    return updatedObject(state, updatedState);
};

const moveCryptoBufferToData = (state, action) => {
    const updatedState = {
        allData: Object.entries(state.cryptoDataBuffer).length ? state.cryptoDataBuffer : state.allData
    };
    return updatedState(state, updatedState);
};

////////////////////////////////////////////
//Removes a column from the table
/////////////////////////////////////////
const addColumnData = (state, action) => {
    let updatedState = {};

    if (Object.keys(state.cryptoDataBuffer).length > 0) {
        let allData = _.cloneDeep(state.cryptoDataBuffer);
        let cryptoDataBuffer = _.cloneDeep(state.cryptoDataBuffer);

        updatedState = {
            allData,
            cryptoDataBuffer: {}
        };
    }

    return updatedObject(state, updatedState);
};

const editColumnData = (state, action) => {
    let allData = _.cloneDeep(state.cryptoDataBuffer);
    let cryptoDataBuffer = _.cloneDeep(state.cryptoDataBuffer);

    const updatedState = {
        allData,
        cryptoDataBuffer: {}
    };

    return updatedObject(state, updatedState);
};

const removeColumnData = (state, action) => {
    // removes timeframe from data
    let crypto_data_buffer = _.cloneDeep(state.allData);

    Object.keys(crypto_data_buffer).forEach(crypto => {
        crypto_data_buffer[crypto].columns.forEach((column, index) => {
            if (column.columnId === action.payload.columnId) {
                crypto_data_buffer[crypto].columns.splice(index, 1);
            }
        });
    });

    const updatedState = {
        allData: crypto_data_buffer
    };

    return updatedObject(state, updatedState);
};

/////////////////////////////////////
// updates the store with the latest live data. This data is then matched with the relevant historical data to
// produce an up-to-date percentage to display.
////////////////////////////////////
const updateCurrentData = (state, action) => {
    let crypto_data_buffer = _.cloneDeep(state.allData);
    action.payload.new_data.forEach(crypto => {
        let new_crypto_value;

        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto[2]);
        new_crypto_value = (((current_value - crypto[0]) / crypto[0]) * 100).toFixed(2);

        crypto_data_buffer[crypto[2]].columns[0] = {
            name: "Current Price",
            period: 0,
            crypto_datetime: 0,
            crypto_id: crypto[2],
            crypto_value: new_crypto_value
        };
    });

    const updatedState = {
        allData: crypto_data_buffer,
        currentData: action.payload.new_data
    };

    return updatedObject(state, updatedState);
};

const cryptoDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPTY_HISTOGRAM_DATA:
            return emptyHistogramData(state, action);
        case actionTypes.UPDATE_CURRENT_DATA:
            return updateCurrentData(state, action);
        case actionTypes.PROCESS_DATA_FROM_STORE_FOR_HISTOGRAM:
            return processDataFromStoreForHistogram(state, action);
        case actionTypes.PROCESS_NEW_COLUMN_DATA:
            return processNewColumnData(state, action);

        case actionTypes.MOVE_CRYPTOBUFFER_TO_DATA:
            return moveCryptoBufferToData(state, action);

        case actionTypes.FETCH_CRYPTOS_SUCCESS:
            return fetchCryptosSuccess(state, action);
        case actionTypes.FETCH_CRYPTOS_FAILURE:
            return fetchCryptosFailure(state, action);

        case actionTypes.ADD_COLUMN_DATA:
            return addColumnData(state, action);
        case actionTypes.EDIT_COLUMN_DATA:
            return editColumnData(state, action);
        case actionTypes.REMOVE_COLUMN_DATA:
            return removeColumnData(state, action);
        default:
            return state;
    }
};

export default cryptoDataReducer;
