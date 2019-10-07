import * as actionTypes from "../actions/actionTypes";
import { updatedObject, findCurrentValueOfCrypto, filterCryptos } from "../utilities/utilities";
import _ from "lodash";

const initialState = {
    data: [],
    dataBuffer: [],
    loading: false
};

/////////////////////
// Processes data retrieved from the database on initial page load
///////////////////////
const fetchCryptosSuccess = (state, action) => {
    let data = {};

    action.payload.data[0].forEach(crypto => {
        data[crypto.crypto_id] = {
            crypto_id: crypto.crypto_id,
            crypto_name: crypto.crypto_name,
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
    //      d) the raw value
    //      e) the percent change

    //  console.log(data);

    Object.keys(data).forEach(cryptoBase => {
        data[cryptoBase].columns = [];
        let percentChange, currentValue;

        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach(crypto => {
                if (cryptoBase == crypto.crypto_id) {
                    if (i >= 2 && crypto.data_value) {
                        currentValue = data[cryptoBase].columns[0].rawValue;
                        percentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
                    } else {
                        percentChange = 0;
                    }

                    data[cryptoBase].columns.push({
                        name: action.payload.data[i].name,
                        columnId: action.payload.columnIds[i],
                        period: action.payload.data[i].period,
                        crypto_datetime: crypto.crypto_datetime,
                        crypto_id: crypto.crypto_id,
                        rawValue: crypto.data_value.toFixed(2),
                        percentChange: parseFloat(percentChange),
                        tooltip: {
                            name: action.payload.data[i].name,
                            percentChange
                        }
                    });
                }
            });
        }
    });

    const updatedState = {
        columnIds: action.payload.data.columnIds,
        loading: false,
        data,
        dataBuffer: data
    };

    return updatedObject(state, updatedState);
};

/////////////////////
// Fires if there was a failure when retrieving data on page load
///////////////////////
const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false
    };
    return updatedObject(state, updatedState);
};

const processNewColumnData = (state, action) => {
    ////////////////////////////////
    //Builds new array of CryptoData that will replace the data object once the selections from the histogram have been filtered
    /////////////////////////////////
    let dataBuffer = _.cloneDeep(state.data);

    action.payload.new_column_data.forEach(crypto => {
        let indexToChange, percentChange, currentValue;

        if (crypto.data_value) {
            currentValue = state.data[crypto.crypto_id].columns[0].crypto_value;
            percentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
        } else {
            percentChange = 0;
        }

        if (action.payload.selectedColumnId === 0) {
            ////////
            //we are adding a new column
            ////////

            dataBuffer[crypto.crypto_id].columns.push({
                name: action.payload.new_timeframe_name,
                columnId: state.columnIds[state.data["1182"].columns.length + 1],
                period: state.selectedPeriod.dataPeriod,
                crypto_datetime: crypto.crypto_datetime,
                crypto_id: crypto.crypto_id,
                rawValue: crypto.data_value.toFixed(2),
                percentChange: parseFloat(percentChange),
                tooltip: {
                    name: dataBuffer[crypto.crypto_id].crypto_name,
                    percentChange
                }
            });
        } else {
            ///////
            //we are changing the data for an existing column
            ///////

            indexToChange = dataBuffer[crypto.crypto_id].columns.findIndex(function(column) {
                return column.columnId === action.payload.selectedColumnId;
            });

            dataBuffer[crypto.crypto_id].columns[indexToChange] = {
                ...dataBuffer[crypto.crypto_id].columns[indexToChange],
                name: action.payload.new_timeframe_name,
                crypto_period: crypto.crypto_period,
                crypto_datetime: crypto.crypto_datetime,
                crypto_id: crypto.crypto_id,
                rawValue: crypto.data_value.toFixed(2),
                percentChange: parseFloat(percentChange),
                tooltip: {
                    name: dataBuffer[crypto.crypto_id].crypto_name,
                    percentChange
                }
            };
        }
    });

    const updatedState = { dataBuffer };

    return updatedObject(state, updatedState);
};

const moveCryptoBufferToData = (state, action) => {
    const updatedState = {
        data: Object.entries(state.dataBuffer).length ? state.dataBuffer : state.data
    };
    return updatedObject(state, updatedState);
};

////////////////////////////////////////////
//Removes a column from the table
/////////////////////////////////////////
const addColumnData = (state, action) => {
    const updatedState = {
        data: _.cloneDeep(state.dataBuffer)
    };
    return updatedObject(state, updatedState);
};

const editColumnData = (state, action) => {
    const updatedState = {
        data: _.cloneDeep(state.dataBuffer)
    };

    return updatedObject(state, updatedState);
};

const removeColumnData = (state, action) => {
    let dataBuffer = _.cloneDeep(state.data);

    Object.keys(dataBuffer).forEach(crypto => {
        dataBuffer[crypto].columns.forEach((column, index) => {
            if (column.columnId === action.payload.columnId) {
                dataBuffer[crypto].columns.splice(index, 1);
            }
        });
    });

    const updatedState = {
        data: dataBuffer,
        dataBuffer
    };

    return updatedObject(state, updatedState);
};

/////////////////////////////////////
// updates the store with the latest live data. This data is then matched with the relevant historical data to
// produce an up-to-date percentage to display.
////////////////////////////////////
const updateCurrentData = (state, action) => {
    let dataBuffer = _.cloneDeep(state.data),
        rawValue,
        percentChange;

    action.payload.new_data.forEach(crypto => {
        let newCurrentValue = crypto[0];
        let crypto_id = crypto[2];

        dataBuffer[crypto_id].columns.forEach((column, index) => {
            if (index === 0) {
                rawValue = newCurrentValue;
                percentChange = 0;
            } else {
                rawValue = column.rawValue;
                percentChange = (((newCurrentValue - column.rawValue) / column.rawValue) * 100).toFixed(2);
            }

            dataBuffer[crypto_id].columns[index] = {
                ...dataBuffer[crypto_id].columns[index],
                rawValue: parseFloat(rawValue).toFixed(2),
                percentChange: parseFloat(percentChange)
            };
        });
    });

    const updatedState = {
        data: dataBuffer,
        dataBuffer
    };

    return updatedObject(state, updatedState);
};

const cryptoDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CURRENT_DATA:
            return updateCurrentData(state, action);
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
