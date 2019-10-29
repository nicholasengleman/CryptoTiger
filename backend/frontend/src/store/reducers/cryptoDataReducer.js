import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";
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

    Object.keys(data).forEach((cryptoBase, index) => {
        data[cryptoBase].columns = {};
        let cryptoPercentChange, currentValue, e;
        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach(crypto => {
                if (cryptoBase == crypto.crypto_id) {
                    if (i > 1 && crypto.data_value) {
                        currentValue = data[cryptoBase].columns["0"].cryptoRawValue;
                        cryptoPercentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(
                            2
                        );
                    } else {
                        cryptoPercentChange = 0;
                    }
                    e = i - 1;
                    data[cryptoBase].columns[action.payload.columnIds[e]] = {
                        columnId: action.payload.columnIds[e],
                        columnType: action.payload.data[i].type,
                        columnGroup: action.payload.data[i].group,
                        columnPeriod: action.payload.data[i].period,
                        columnName: action.payload.data[i].name,
                        cryptoDatetime: crypto.crypto_datetime,
                        cryptoId: crypto.crypto_id,
                        cryptoMarketCap: action.payload.data["1"].data[index].market_cap,
                        cryptoRawValue: parseFloat(crypto.data_value),
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
    let updatedState = {};
    ////////////////////////////////
    //Builds new array of CryptoData that will replace the data object once the selections from the histogram have been filtered
    /////////////////////////////////
    let dataBuffer = _.cloneDeep(state.data);
    let id = action.payload.selectedColumnId;

    action.payload.responseData.forEach(crypto => {
        let cryptoPercentChange, currentValue;

        if (crypto.data_value) {
            currentValue = state.data[crypto.crypto_id].columns["0"].cryptoRawValue;
            cryptoPercentChange = (((currentValue - crypto.data_value) / crypto.data_value) * 100).toFixed(2);
        } else {
            cryptoPercentChange = 0;
        }

        dataBuffer[crypto.crypto_id].columns[id] = {
            columnId: id,
            columnType: action.payload.dataType,
            columnGroup: action.payload.dataGroup,
            columnPeriod: action.payload.dataPeriod,
            columnName: action.payload.dataName,
            cryptoDatetime: crypto.crypto_datetime,
            cryptoId: crypto.cryptoId,
            cryptoRawValue: parseFloat(crypto.data_value),
            cryptoPercentChange: parseFloat(cryptoPercentChange),
            tooltip: {
                cryptoName: dataBuffer[crypto.crypto_id].cryptoName,
                cryptoPercentChange
            }
        };
    });

    if (action.payload.processForHistogram) {
        updatedState = {
            dataBuffer
        };
    } else {
        updatedState = {
            data: dataBuffer,
            dataBuffer
        };
    }

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

const emptyData = (state, action) => {
    let data = _.cloneDeep(state.data);
    Object.keys(data).forEach(crypto => {
        Object.keys(data[crypto].columns).forEach((column, index) => {
            if (index > 0) {
                delete data[crypto].columns[column];
            }
        });
    });

    const updatedState = {
        data,
        dataBuffer: data
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
    let data = _.cloneDeep(state.data),
        cryptoRawValue,
        cryptoPercentChange;

    action.payload.newData.forEach(crypto => {
        let newCurrentValue = crypto[0];
        let cryptoId = crypto[2];

        Object.keys(data[cryptoId].columns).forEach((column, index) => {
            if (index === 0) {
                cryptoRawValue = newCurrentValue;
                cryptoPercentChange = 0;
            } else {
                cryptoRawValue = data[cryptoId].columns[column].cryptoRawValue;
                cryptoPercentChange = (
                    ((newCurrentValue - data[cryptoId].columns[column].cryptoRawValue) /
                        data[cryptoId].columns[column].cryptoRawValue) *
                    100
                ).toFixed(2);
            }

            data[cryptoId].columns[column] = {
                ...data[cryptoId].columns[column],
                cryptoRawValue: parseFloat(cryptoRawValue),
                cryptoPercentChange: parseFloat(cryptoPercentChange),
                tooltip: {
                    ...data[cryptoId].columns[column].tooltip,
                    cryptoPercentChange: parseFloat(cryptoPercentChange)
                }
            };
        });
    });

    const updatedState = {
        data
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
        case actionTypes.EMPTY_DATA:
            return emptyData(state, action);

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
