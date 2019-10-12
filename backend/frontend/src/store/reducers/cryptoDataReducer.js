import * as actionTypes from "../actions/actionTypes";
import { updatedObject, findCurrentValueOfCrypto, filterCryptos } from "../utilities/utilities";
import _ from "lodash";

const initialState = {
    data: [],
    dataBuffer: [],
    loading: false,
    columnIds: []
};

/////////////////////
// Processes data retrieved from the database on initial page load
///////////////////////
const fetchCryptosSuccess = (state, action) => {
    let data = {};
    action.payload.data[0].forEach(crypto => {
        data[crypto.crypto_id] = {
            cryptoId: crypto.crypto_id,
            cryptoName: crypto.crypto_name,
            cryptoShortname: crypto.crypto_shortname,
            cryptoIconUrl: crypto.crypto_icon_url
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

    Object.keys(data).forEach(cryptoBase => {
        data[cryptoBase].columns = {};
        let cryptoPercentChange, currentValue;

        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach(crypto => {
                if (cryptoBase == crypto.crypto_id) {
                    if (i >= 2 && crypto.data_value) {
                        currentValue = data[cryptoBase].columns["2"].cryptoRawValue;
                        cryptoPercentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(
                            2
                        );
                    } else {
                        cryptoPercentChange = 0;
                    }

                    data[cryptoBase].columns[action.payload.columnIds[i]] = {
                        columnId: action.payload.columnIds[i],
                        columnName: action.payload.data[i].name,
                        columnPeriod: action.payload.data[i].period,
                        cryptoDatetime: crypto.crypto_datetime,
                        cryptoId: crypto.crypto_id,
                        cryptoRawValue: parseFloat(crypto.data_value.toFixed(2)),
                        cryptoPercentChange: parseFloat(cryptoPercentChange),
                        tooltip: {
                            cryptoName: data[crypto.crypto_id].cryptoName,
                            cryptoPercentChange
                        }
                    };
                }
            });
        }
    });

    const updatedState = {
        data,
        dataBuffer: data,
        loading: false,
        columnIds: action.payload.columnIds
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
    let id = action.payload.selectedColumnId;

    action.payload.responseData.forEach(crypto => {
        let cryptoPercentChange, currentValue;

        if (crypto.data_value) {
            currentValue = state.data[crypto.crypto_id].columns["2"].cryptoRawValue;
            cryptoPercentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
        } else {
            cryptoPercentChange = 0;
        }

        dataBuffer[crypto.crypto_id].columns[id] = {
            columnId: id,
            columnName: action.payload.periodName,
            columnPeriod: action.payload.periodNumber,
            cryptoDatetime: crypto.crypto_datetime,
            cryptoId: crypto.cryptoId,
            cryptoRawValue: parseFloat(crypto.data_value.toFixed(2)),
            cryptoPercentChange: parseFloat(cryptoPercentChange),
            tooltip: {
                cryptoName: dataBuffer[crypto.crypto_id].cryptoName,
                cryptoPercentChange
            }
        };
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

const resetCryptoBuffer = (state, action) => {
    const updatedState = {
        dataBuffer: []
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
        Object.keys(dataBuffer[crypto].columns).forEach((column, index) => {
            if (dataBuffer[crypto].columns[column].columnId === action.payload.columnId) {
                delete dataBuffer[crypto].columns[column];
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
// updates the store with the latest live data.
////////////////////////////////////
const updateCurrentData = (state, action) => {
    let dataBuffer = _.cloneDeep(state.data),
        cryptoRawValue,
        cryptoPercentChange;

    action.payload.new_data.forEach(crypto => {
        let newCurrentValue = crypto[0];
        let cryptoId = crypto[2];

        dataBuffer[cryptoId].columns.forEach((column, index) => {
            if (index === 0) {
                cryptoRawValue = newCurrentValue;
                cryptoPercentChange = 0;
            } else {
                cryptoRawValue = column.cryptoRawValue;
                cryptoPercentChange = (
                    ((newCurrentValue - column.cryptoRawValue) / column.cryptoRawValue) *
                    100
                ).toFixed(2);
            }

            dataBuffer[cryptoId].columns[index] = {
                ...dataBuffer[cryptoId].columns[index],
                cryptoRawValue: parseFloat(cryptoRawValue).toFixed(2),
                cryptoPercentChange: parseFloat(cryptoPercentChange),
                tooltip: {
                    ...dataBuffer[cryptoId].columns[index].tooltip,
                    cryptoPercentChange: parseFloat(cryptoPercentChange)
                }
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
        case actionTypes.RESET_CRYPTO_BUFFER:
            return resetCryptoBuffer(state, action);

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
