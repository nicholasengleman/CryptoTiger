const axios = require("axios");
const db = require("../utilities/db");

////////////////////////////
//create tables
///////////////////////////
function createTables() {
    var sql =
        "CREATE TABLE CryptoList (crypto_id INT NOT NULL PRIMARY KEY, " +
        "crypto_name TINYTEXT NOT NULL, " +
        "crypto_shortname TINYTEXT NOT NULL, " +
        "crypto_icon_url TINYTEXT)";
    db.query(sql, function (error, results) {
        if (error) throw error;
        console.log("CryptoList table created");
    });

    // var sql =
    //     "CREATE TABLE CryptoStringDataValues (crypto_datetime datetime, crypto_id INT, data_value float, PRIMARY" +
    //     " KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
    // db.connection.query(sql, function (error, results) {
    //     if (error) throw error;
    //     console.log("table created");
    // });

    var sql =
        "CREATE TABLE CryptoNumberDataValues (crypto_datetime datetime, crypto_id INT, data_value FLOAT, PRIMARY KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
    db.query(sql, function (error, results) {
        if (error) throw error;
        console.log("CryptoNumberDataValues table created");
    });
}

createTables();


