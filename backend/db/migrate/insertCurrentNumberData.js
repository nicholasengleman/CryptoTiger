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

const connection = require("./../db");
const getCryptoShortNames = require("./../utilities/getCryptoShortNames");
const getCurrentData = require("../utilities/getCurrentData");
const getDataInfoTable = require("../utilities/getDataInfoTable");
const getCryptoListTable = require("../utilities/getCryptoListTable");

function insertCurrentNumberData() {
    getCryptoShortNames((err, cryptoShortNames) => {
        if (err) throw err;
        getCurrentData(cryptoShortNames, (err, data) => {
            if (err) throw err;
            insertDataInTable(data, (err, results) => {
                if (err) throw err;
            });
        });
    });
}

function insertDataInTable(data, callback) {
    getDataInfoTable((err, DATA_INFO_TABLE) => {
        getCryptoListTable((err, CRYPTO_LIST_TABLE) => {

            //iterates over each data type(price, volume, market cap, etc)
            data.forEach(crypto => {
                //get data id for each crypto
                let data_types = Object.keys(crypto).filter(el => {
                    return el !== 'shortname';
                });

                let cryptoList = [];

                data_types.forEach(data_type => {
                    const data_id = DATA_INFO_TABLE[data_type].current["0"].data_id;

                    //get crypto id for each crypto
                    const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;

                    cryptoList.push([data_id, crypto_id, crypto.price]);
                });

                try {
                    let sql =
                        "INSERT IGNORE INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";
                    connection.query(sql, [cryptoList], function (error, results) {
                        if (error) callback(error);
                        return results;
                    });
                } catch (error) {
                    callback(error);
                }
            })
        })
    });
    console.log("Finished Inserting Current Number Data.")
}


module.exports = insertCurrentNumberData;

