var axios = require("axios");
const db = require("./../db");

////////////////////////////
//create tables
///////////////////////////
function createTables() {
  var sql =
    "CREATE TABLE CryptoList (crypto_id INT NOT NULL PRIMARY KEY, crypto_name TINYTEXT NOT NULL)";
  db.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE DataInfo (data_id VARCHAR(100) NOT NULL PRIMARY KEY, data_name TINYTEXT NOT NULL, data_period_type TINYTEXT NOT NULL, data_period INT NOT NULL)";
  db.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE CryptoStringDataValues (data_id VARCHAR(100), crypto_id INT, data_value TEXT, PRIMARY KEY(data_id, crypto_id), FOREIGN KEY(data_id) REFERENCES DataInfo(data_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
  db.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });

  var sql =
    "CREATE TABLE CryptoNumberDataValues (data_id VARCHAR(100), crypto_id INT, data_value FLOAT, PRIMARY KEY(data_id, crypto_id), FOREIGN KEY(data_id) REFERENCES DataInfo(data_id) ON DELETE CASCADE, FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
  db.connection.query(sql, function(error, results) {
    if (error) throw error;
    console.log("table created");
  });
}

module.exports = { createTables };
