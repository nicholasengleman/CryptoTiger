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

var axios = require("axios");
const db = require("./../db/db");
const api_key = require("./../db/api_key.js");
const DATA_ID_MAP = require("./../db/data_id_map");

class UpdateDBNumberTable {
  constructor() {}

  getCryptoIDsShortnames => {
    var sql = "SELECT crypto_id, crypto_shortname FROM CryptoList";
    db.connection.query(sql, function(error, results) {
      if (error) {
        return error;
      } else {
        this.getHistoricalData(results);
      }
    });
  }
  getHistoricalData(result) {
    result.forEach((data, zoo) => {
      var interval_id = setInterval(function() {
        if (zoo === 100) {
          clearInterval(interval_id);
          console.log("finished");
        }
        let cryptoList = [];
        const request = axios
          .get(
            "https://min-api.cryptocompare.com/data/histohour?fsym=" +
              data.crypto_shortname +
              "&tsym=USD&limit=9&?" +
              api_key +
              ""
          )
          .then(response => {
            console.log(response.data.Data);
            return response.data.Data;
          })
          .catch(error => {
            console.log(error);
          });
        request.then(historicaldata => {
          return historicaldata;
        });
      }, 3000);
    });


  updateDataInTable(data) {
    let cryptoList = [];
    if (Array.isArray(data)) {
      data.forEach(bar => {
        /* 2) Calculate the Data_id
            a) From the time data returned from the api, calculate the hours since current time for each data timepoint
            b) plug those hours into the DATA_ID_MAP to return the data id */
        let data_id = 0;
        let period =
          Math.floor(
            (new Date() - new Date(bar.time * 1000)) / 1000 / 60 / 60
          ) + 1;
        data_id = DATA_ID_MAP.PRICE.HOUR[period];
        if (!data_id) {
          console.log(period);
        }
        let coinInfo = [data.crypto_id, bar.close, data_id];
        cryptoList.push(coinInfo);
      });
      //  console.log(cryptoList);
      var sql =
        "UPDATE CryptoNumberDataValues SET data_value = ? WHERE data_id = ? AND crypto_id = ?";
      for (var i = 0; i < cryptoList.length; i++) {
        db.connection.query(sql, cryptoList[i], function(error, results) {
          if (error) throw error;
        });
      }
    }
  }
  insertDataIntoTable(data) {
    let cryptoList = [];
    if (Array.isArray(data)) {
      data.forEach(bar => {
        /* 2) Calculate the Data_id
            a) From the time data returned from the api, calculate the hours since current time for each data timepoint
            b) plug those hours into the DATA_ID_MAP to return the data id */
        let data_id = 0;
        let period =
          Math.floor(
            (new Date() - new Date(bar.time * 1000)) / 1000 / 60 / 60
          ) + 1;
        data_id = DATA_ID_MAP.PRICE.HOUR[period];
        if (!data_id) {
          console.log(period);
        }
        let coinInfo = [data_id, data.crypto_id, bar.close];
        cryptoList.push(coinInfo);
      });
      console.log(cryptoList);
      var sql =
        "INSERT INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";
      db.connection.query(sql, [cryptoList], function(error, results) {
        if (error) throw error;
        console.log(i + "result");
      });
    }
  }
}

module.exports = UpdateDBNumberTable;
