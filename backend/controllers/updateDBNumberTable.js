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

  updateData() {
    this.getCryptoIDsShortname((err, results) => {
      if (err) return err;
      this.getHistoricalData(results, (err, data) => {
        if (err) return err;
        this.updateDataInTable(data, err => {
          if (err) return err;
        });
      });
    });
  }

  insertData() {
    this.getCryptoIDsShortname((err, results) => {
      if (err) return err;
      this.getHistoricalData(results, (err, data) => {
        if (err) return err;
        this.insertDataInTable(data, err => {
          if (err) return err;
        });
      });
    });
  }

  getCryptoIDsShortname(callback) {
    //returns shortnames of all cryptos in database
    var sql = "SELECT crypto_id, crypto_shortname FROM CryptoList";
    db.connection.query(sql, function(err, results) {
      callback(err, results);
    });
  }

  getHistoricalData(data, callback) {
    //gets last 9 bars of historical data for each crypto returned by getCryptoIDsShortnames()
    let i = 0;
    let interval_id = setInterval(() => {
      const request = axios
        .get(
          "https://min-api.cryptocompare.com/data/histohour?fsym=" +
            data[i].crypto_shortname +
            "&tsym=USD&limit=9&?" +
            api_key +
            ""
        )
        .then(response => {
          if (Object.keys(response.data.RateLimit).length > 0) {
            console.log(response.data.RateLimit);
          }
          return response.data.Data;
        })
        .catch(error => {
          console.log(error);
          callback(error);
        });
      request.then(historical_data => {
        if (data[i]) {
          let callbackstr = {};
          callbackstr.i = i;
          callbackstr.crypto_id = data[i].crypto_id;
          callbackstr.historical_data = historical_data;
          callback(null, callbackstr);
        }
      });
      i++;
      if (!data[i] || i > data.length) {
        console.log("finished");
        clearInterval(interval_id);
      }
    }, 50);
  }

  updateDataInTable(data, callback) {
    let count = data.i;
    let crypto_id = data.crypto_id;
    let historical_data = data.historical_data;
    //creates array of crypto id, crypto value and data id for each bar of historical data
    //then updates the CryptoNumberDataValues table with this new data
    let cryptoList = [];
    try {
      if (Array.isArray(historical_data)) {
        historical_data.forEach(bar => {
          let period =
            Math.floor(
              (new Date() - new Date(bar.time * 1000)) / 1000 / 60 / 60
            ) + 1;
          let data_id = DATA_ID_MAP.PRICE.HOUR[period];
          let coinInfo = [crypto_id, bar.close, data_id];
          cryptoList.push(coinInfo);
        });
        //    console.log(cryptoList);
        let prevCount = 0;
        var sql =
          "UPDATE CryptoNumberDataValues SET data_value = ? WHERE data_id = ? AND crypto_id = ?";
        for (var i = 0; i < cryptoList.length; i++) {
          db.connection.query(sql, cryptoList[i], function(error, results) {
            if (error) {
              callback(error);
            } else {
              if (prevCount != count) {
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

  insertDataIntoTable(data) {
    let cryptoList = [];
    if (Array.isArray(data)) {
      data.forEach(bar => {
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
        "INSERT IGNORE INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";
      db.connection.query(sql, [cryptoList], function(error, results) {
        if (error) throw error;
      });
    }
  }
}

module.exports = UpdateDBNumberTable;
