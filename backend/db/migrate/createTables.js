const axios = require("axios");
const db = require("../utilities/db");

////////////////////////////
//create tables
///////////////////////////
function createTables() {
    const sql_0 = `CREATE TABLE CryptoList (crypto_id INT NOT NULL PRIMARY KEY crypto_name TINYTEXT NOT NULL crypto_shortname TINYTEXT NOT NULL crypto_icon_url TINYTEXT)`;
    db.query(sql_0, function (error, results) {
        if (error) throw error;
        console.log("CryptoList table created");
    });

    const sql_1 = `CREATE TABLE CryptoNumberDataValues (crypto_datetime datetime, crypto_id INT, data_value FLOAT, PRIMARY KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_1, function (error, results) {
        if (error) throw error;
        console.log("CryptoNumberDataValues table created");
    });

    const sql_2 = `CREATE TABLE CryptoCurrentData (crypto_id INT, data_id INT, data_value FLOAT, PRIMARY KEY(crypto_id, data_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_2, function (error, results) {
        if (error) throw error;
        console.log("CryptoNumberDataValues table created");
    });

    // var sql =
    //     "CREATE TABLE CryptoStringDataValues (crypto_datetime datetime, crypto_id INT, data_value float, PRIMARY" +
    //     " KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)";
    // db.connection.query(sql, function (error, results) {
    //     if (error) throw error;
    //     console.log("table created");
    // });

}

createTables();


