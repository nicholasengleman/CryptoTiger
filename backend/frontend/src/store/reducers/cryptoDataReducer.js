import * as actionTypes from "../actions/actionTypes";
import { updatedObject, findCurrentValueOfCrypto, filterCryptos } from "../../utilities/utilities";
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
    // allData array with all filters applied. Data that is actually shown on the page.
    displayedData: [],

    loading: false,
    error: null,
    selectedColumn: "",

    filterParameters: [],
};



/////////////////////
// Processes data retrieved from the database on initial page load
///////////////////////
const fetchCryptosSuccess = (state, action) => {
    let default_data = {};


    action.payload.data[0].forEach(crypto => {
        default_data[crypto.crypto_id] = {
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
    //      d) the value to display for this cell

    Object.keys(default_data).forEach(crypto => {
        default_data[crypto].columns = [];
        let new_crypto_value;

        for (let i = 1; i < action.payload.data.length; i++) {
            action.payload.data[i].data.forEach(crypto_tf => {
                if (crypto_tf.crypto_id === default_data[crypto].crypto_id) {
                    if (i < 2) {
                        new_crypto_value = crypto_tf.data_value;
                    } else {
                        const current_value = findCurrentValueOfCrypto(
                            action.payload.data[1].data,
                            crypto_tf.crypto_id
                        );
                        new_crypto_value = (
                            ((current_value - crypto_tf.data_value) / crypto_tf.data_value) *
                            100
                        ).toFixed(2);
                    }

                    default_data[crypto].columns.push({
                        name: action.payload.data[i].name,
                        period: action.payload.data[i].period,
                        crypto_datetime: crypto_tf.crypto_datetime,
                        crypto_id: crypto_tf.crypto_id,
                        crypto_value: new_crypto_value
                    });
                }
            });
        }
    });

    const updatedState = {
        loading: false,
        allData: default_data,
        displayedData:  default_data,
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
        error: true
    };
    return updatedObject(state, updatedState);
};



//////////////////////
/// Processes Data for Histogram when a Column Header is clicked
/////////////////////
const processDataFromStoreForHistogram = (state, action) => {
    let histogramData = [];
    const name_of_selected_column = action.payload.current_selected_column;

    for(let crypto in state.allData) {
       state.allData[crypto].columns.forEach(column => {
           if(column.name === name_of_selected_column) {
               histogramData.push({ id: column.crypto_id, value: Number(column.crypto_value), tooltip: [column.crypto_value] });
           }
       })
    }

    const updatedState = {
        selectedColumn: action.payload.current_selected_column,
        histogramData
    };

    return updatedObject(state, updatedState);
};


const setSelectedColumn = (state, action) => {
    const updatedState = {
        selectedColumn: action.payload.selectedColumn
    };

    return updatedObject(state, updatedState);
};

///////////////////
//Empties the Histogram Array when a new period is selected
//////////////////
const emptyHistogramData = (state, action) => {
    const updatedState = {
        histogramData: []
    };
    return updatedObject(state, updatedState);
};

//////////////////////////////
// Processes data retrieved from database when a period is selected in the Data Window
// 1. Creates array of objects of crypto id and percentage change to pass to histogram slider component
// 2. Builds new array of CryptoData that will replace the allData object once the selections from the histogram have been filtered
//////////////////////////////
const processNewColumnData = (state, action) => {
    let histogramData = [];

    // 1. Calculates percentage and builds an array of objects of structure {id: cryptoid, value: percentage } to pass to the histogram slider component
    action.payload.new_column_data.forEach(crypto => {
        const current_value = findCurrentValueOfCrypto(state.currentData.data, crypto.crypto_id);
        const percentage = (((current_value - crypto.data_value) / crypto.data_value) * 100).toFixed(2);

        histogramData.push({ id: crypto.crypto_id, value: Number(percentage), tooltip: [String(percentage)] });
    });

    // 2. Builds new array of CryptoData that will replace the allData object once the selections from the histogram have been filtered
    let crypto_data_buffer = _.cloneDeep(state.allData);
    action.payload.new_column_data.forEach(crypto => {
        let new_crypto_value;

        let index_of_el_to_change = crypto_data_buffer[crypto.crypto_id].columns.findIndex(function(arr) {
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
        histogramData
    };

    return updatedObject(state, updatedState);
};



////////////////////////////////////////////
//Adds a filter from the histogram to the filter array
/////////////////////////////////////////
const addFilter = (state, action) => {
    let newFilterParameters = _.cloneDeep(state.filterParameters);

    newFilterParameters.push({
        column: state.selectedColumn,
        parameters: action.payload.parameters
    });

    const updatedState = {
        filterParameters: newFilterParameters,
        displayedData: filterCryptos(state.allData, newFilterParameters)
    };

    return updatedObject(state, updatedState);
};



// Reducers not being used

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
        case actionTypes.SET_SELECTED_COLUMN:
            return setSelectedColumn(state, action);
        case actionTypes.PROCESS_DATA_FROM_STORE_FOR_HISTOGRAM:
            return processDataFromStoreForHistogram(state, action);
        case actionTypes.PROCESS_NEW_COLUMN_DATA:
            return processNewColumnData(state, action);
        case actionTypes.FETCH_CRYPTOS_SUCCESS:
            return fetchCryptosSuccess(state, action);
        case actionTypes.FETCH_CRYPTOS_FAILURE:
            return fetchCryptosFailure(state, action);
        case actionTypes.ADD_FILTER:
            return addFilter(state, action);
        default:
            return state;
    }
};

export default cryptoDataReducer;
