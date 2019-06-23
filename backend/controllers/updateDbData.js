//every minute get new historical data from api for all supported cryptos

//1) get hourly historical data for 1 crypto

var axios = require("axios");
const db = require("./../db/db");
const api_key = require("./../db/api_key.js");
const DATA_ID_MAP = require("../db/utilities/getDataInfoObject");

//insert list of cryptos
function updateDB() {
  let cryptoList = [];
  const request = axios
    .get(
      "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&?" +
        api_key +
        ""
    )
    .then(response => {
      return response.data.Data;
    })
    .catch(error => {
      console.log(error);
    });

  request.then(data => {
    data.forEach(coin => {
      //each data point needs the data_id, crypto id, value

      ///data_id
      let data_id = 0;
      let period = (new Date() - new Date(coin.time * 1000)) / 1000 / 60 / 60;
      if (Object.keys(DATA_ID_MAP).length() < period) {
        data_id = DATA_ID_MAP.price[period];
      } else {
        data_id = "";
      }

      //crypto_id
      let sql = "INSERT INTO CryptoList (crypto_id, crypto_name) VALUES ?";

      db.connection.query(sql, [cryptoList], function(error, results) {
        if (error) throw error;
        dbConnect.connection.end();
        console.log(results);
      });

      let coinInfo = [data_id];
      cryptoList.push(coinInfo);
    });

    console.log(cryptoList);

    var sql = "INSERT INTO CryptoList (crypto_id, crypto_name) VALUES ?";

    db.connection.query(sql, [cryptoList], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = updateDB;
