var axios = require("axios");
const dbConnect = require("./dbConnect");

const api_key =
  "e059e20e2ac72a679e388f3b9e4e04e7523705d10ca496d0bb70889786e235a0";

////////////////////////////
//create tables
///////////////////////////
function createTables() {
  var sql =
    "CREATE TABLE CryptoList (crypto_id INT NOT NULL PRIMARY KEY, crypto_name TINYTEXT NOT NULL)";
  dbConnect.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE DataInfo (data_id VARCHAR(100) NOT NULL PRIMARY KEY, data_name TINYTEXT NOT NULL, data_period_type TINYTEXT NOT NULL, data_period INT NOT NULL)";
  dbConnect.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE CryptoStringDataValues (data_id VARCHAR(100), crypto_id INT, data_value TEXT, PRIMARY KEY(data_id, crypto_id), FOREIGN KEY(data_id) REFERENCES DataInfo(data_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
  dbConnect.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE CryptoNumberDataValues (data_id VARCHAR(100), crypto_id INT, data_value FLOAT, PRIMARY KEY(data_id, crypto_id), FOREIGN KEY(data_id) REFERENCES DataInfo(data_id) ON DELETE CASCADE, FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
  dbConnect.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });
}

//insert list of cryptos
function insertCryptoList() {
  let cryptoList = [];
  const request = axios
    .get(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?" +
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
      let coinInfo = [coin.CoinInfo.Id, coin.CoinInfo.FullName];
      cryptoList.push(coinInfo);
    });

    console.log(cryptoList);

    var sql = "INSERT INTO CryptoList (crypto_id, crypto_name) VALUES ?";

    dbConnect.connection.query(sql, [cryptoList], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

//insert data info
function insertDataInfo() {
  let dataInfo = [];

  const request = axios
    .get(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?" +
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
    let currentPrice = ["PRICE_CURRENT_0", "Current Price", "current", 0];
    let currentMKTCP = ["MKCAP_CURRENT_0", "Current Market Cap", "current", 0];
    dataInfo.push(currentPrice, currentMKTCP);

    var sql =
      "INSERT INTO DataInfo (data_id, data_name, data_period_type, data_period) VALUES ?";

    dbConnect.connection.query(sql, [dataInfo], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = { createTables, insertCryptoList, insertDataInfo };
