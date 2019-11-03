import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";
import _ from "lodash";

const initialState = {
    data: []
};

/////////////////////
// Processes data retrieved from the database on initial page load
///////////////////////
const loadTopChartData = (state, action) => {
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
        for (let i = 1; i < 3; i++) {
            action.payload.data[i].data.forEach(crypto => {
                if (cryptoBase == crypto.crypto_id) {
                    if (i > 1 && crypto.data_value) {
                        currentValue = data[cryptoBase].columns["0"].cryptoRawValue;
                        cryptoPercentChange = ((currentValue - crypto.data_value) / crypto.data_value) * 100;
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
                        cryptoRawPercentChange: parseFloat(cryptoPercentChange),
                        cryptoPercentChange: parseFloat(cryptoPercentChange.toFixed(2)),
                        tooltip: {
                            cryptoName: data[crypto.crypto_id].cryptoName,
                            cryptoPercentChange: cryptoPercentChange.toFixed(2)
                        }
                    };
                }
            });
        }
    });

    const updatedState = { data };

    return updatedObject(state, updatedState);
};

/////////////////////////////////////
// updates the store with the latest live data.
////////////////////////////////////
const updateTopChartData = (state, action) => {
    let data = _.cloneDeep(state.data),
        cryptoRawValue,
        cryptoPercentChange;

    action.payload.data.forEach(crypto => {
        let newCurrentValue = crypto[0];
        let cryptoId = crypto[2];

        Object.keys(data[cryptoId].columns).forEach((column, index) => {
            if (index === 0) {
                cryptoRawValue = newCurrentValue;
                cryptoPercentChange = 0;
            } else {
                cryptoRawValue = data[cryptoId].columns[column].cryptoRawValue;
                cryptoPercentChange =
                    ((newCurrentValue - data[cryptoId].columns[column].cryptoRawValue) /
                        data[cryptoId].columns[column].cryptoRawValue) *
                    100;
            }

            data[cryptoId].columns[column] = {
                ...data[cryptoId].columns[column],
                cryptoRawValue: parseFloat(cryptoRawValue),
                cryptoRawPercentChange: parseFloat(cryptoPercentChange),
                cryptoPercentChange: parseFloat(cryptoPercentChange.toFixed(2)),
                tooltip: {
                    ...data[cryptoId].columns[column].tooltip,
                    cryptoPercentChange: parseFloat(cryptoPercentChange).toFixed(2)
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
        case actionTypes.UPDATE_TOP_CHART_DATA:
            return updateTopChartData(state, action);
        case actionTypes.LOAD_TOP_CHART_DATA:
            return loadTopChartData(state, action);
        default:
            return state;
    }
};

export default cryptoDataReducer;
