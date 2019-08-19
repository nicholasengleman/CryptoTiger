/*
This module updates the Number Table with the latest historical data.
The function needs to first retrieve/calculate 3 values to update the DB: the data_id, crypto_id and crypto value.

1) Get new historical data from api
    a) select all the crypto shortnames and crypto ids from the CryptoInfo table
    b) iterate over these returned values and for each value api call new historical data
2) Calculate the Data_id
    a) From the time data returned from the api, calculate the hours since current time for each data timepoint
    b) plug those hours into the DATA_ID_MAP to return the data id
3) Calculate the crypto_id
    a)
*/

const connection = require("../../../utilities/db");
const getHistoricalData = require("../../../utilities/getHistoricalPrice");
const getDataInfoObject = require("../../../../server_tables/timeframeList");
const computeDataId = require("../utlities/computeDataId");

function insertHistoricalPrice() {
    let total_rows_changed = 0;

    getDataInfoObject((error, DATA_INFO_MAP) => {
        Object.keys(DATA_INFO_MAP.price).forEach(timeframe => {
            if (timeframe !== "current") {
                getHistoricalData(timeframe, (err, data) => {
                    if (err) throw err;
                    insertDataInTable(data, timeframe, total_rows_changed, (err, results) => {
                        if (err) throw err;
                    });
                });
            }
        });
    });
}

function insertDataInTable(data, timeframe, total_rows_changed, callback) {
    let count = data.i;
    let crypto_id = data.crypto_id;
    let historical_data = data.historical_data;

    let cryptoList = [];
    try {
        getDataInfoObject((error, DATA_INFO_MAP) => {
            historical_data.forEach(bar => {
                computeDataId(timeframe, bar.time, DATA_INFO_MAP, function(err, data_id) {
                    if (err) throw err;
                    cryptoList.push([data_id, data.crypto_id, bar.close]);
                });
            });

            var sql = "INSERT IGNORE INTO crypto_price_historical (data_id, crypto_id, data_value) VALUES ?";
            connection.query(sql, [cryptoList], function(error, results) {
                if (error) callback(error);
                console.log(results.changedRows + " rows changed.");
                return results;
            });
        });
    } catch (error) {
        callback(error);
    }
}

module.exports = insertHistoricalPrice;
