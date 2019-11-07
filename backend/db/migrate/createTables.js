const axios = require("axios");
const db = require("./../utilities/db");

////////////////////////////
//create tables
///////////////////////////
function createTables() {
    const sql_0 = `CREATE TABLE CryptoList (crypto_id INT NOT NULL PRIMARY KEY, crypto_name TINYTEXT NOT NULL, crypto_shortname TINYTEXT NOT NULL, crypto_icon_url TINYTEXT)`;
    db.query(sql_0, function(error, results) {
        if (error) throw error;
        console.log("CryptoList table created");
    });

    const sql_1 = `CREATE TABLE crypto_price_historical (crypto_datetime INT, crypto_id INT, data_value FLOAT, PRIMARY KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_1, function(error, results) {
        if (error) throw error;
        console.log("crypto_price_historical table created");
    });

    const sql_2 = `CREATE TABLE crypto_price_current (crypto_id INT, data_id INT, data_value FLOAT, PRIMARY KEY(crypto_id, data_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_2, function(error, results) {
        if (error) throw error;
        console.log("crypto_price_current table created");
    });

    const sql_3 = `CREATE TABLE crypto_volume_historical (crypto_datetime INT, crypto_id INT, data_value FLOAT, PRIMARY KEY(crypto_datetime, crypto_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_3, function(error, results) {
        if (error) throw error;
        console.log("crypto_price_historical table created");
    });

    const sql_4 = `CREATE TABLE crypto_volume_current (crypto_id INT, data_id INT, data_value FLOAT, PRIMARY KEY(crypto_id, data_id), FOREIGN KEY(crypto_id) REFERENCES CryptoList(crypto_id) ON DELETE CASCADE)`;
    db.query(sql_4, function(error, results) {
        if (error) throw error;
        console.log("crypto_price_current table created");
    });
}

createTables();
