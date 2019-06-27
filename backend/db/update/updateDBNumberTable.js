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
const getHistoricalData = require("./../utilities/getHistoricalData");
const getDataInfoObject = require("./../utilities/getDataInfoObject");
const computeDataId = require("./../utilities/computeDataId");

function updateDBNumberTable(timeframe = "hour") {
  getCryptoShortNames((err, cryptoShortNames) => {
    if (err) throw err;
    getDataInfoObject((error, DATA_INFO_MAP) => {
      if (typeof DATA_INFO_MAP["price"][timeframe] === "undefined") {
        console.log("Invalid Timeframe");
      } else {
        let length = Object.keys(DATA_INFO_MAP["price"][timeframe]).length;
        getHistoricalData(cryptoShortNames, timeframe, length, (err, data) => {
          if (err) throw err;
          // updateDataInTable(data, DATA_INFO_MAP, timeframe, err => {
          //     if (err) throw err;
          // });
        });
      }
    });
  });
}

function updateDataInTable(data, DATA_INFO_MAP, timeframe, callback) {
  let count = data.i;
  let crypto_id = data.crypto_id;
  let historical_data = data.historical_data;
  //console.log(historical_data);
  //creates array of crypto id, crypto value and data id for each bar of historical data
  //then updates the CryptoNumberDataValues table with this new data
  let cryptoList = [];
  try {
    if (Array.isArray(historical_data)) {
      historical_data.forEach(bar => {
        computeDataId(timeframe, bar.time, DATA_INFO_MAP, function(
          err,
          data_id
        ) {
          if (err) throw err;
          cryptoList.push([bar.close, data_id, crypto_id]);
        });
      });

      console.log(cryptoList);

      let prevCount = 0;

      let sql =
        "UPDATE CryptoNumberDataValues SET data_value = ? WHERE data_id = ? AND crypto_id = ?";
      for (let i = 0; i < cryptoList.length; i++) {
        connection.query(sql, cryptoList[i], function(error, results) {
          if (error) {
            callback(error);
          } else {
            if (prevCount !== count) {
              console.log(
                "crypto " + count + " updated. (10 rows updated for each)"
              );
              prevCount = count;
            }
          }
        });
      }
    }
  } catch (error) {
    callback(error);
  }
}

module.exports = updateDBNumberTable;
