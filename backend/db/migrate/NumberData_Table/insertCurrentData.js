const connection = require("../../db");
const getCurrentData = require("../../utilities/getCurrentData");
const prepareCurrentData = require("../../utilities/prepareCurrentData");

function insertCurrentData() {
    getCurrentData((err, cryptos) => {
        if (err) throw err;
        insertDataInTable(cryptos, err => {
            if (err) throw err;
        });
    });
}

function insertDataInTable(cryptos, callback) {
    let data_types = Object.keys(cryptos[0]).filter(el => {
        return el !== 'shortname';
    });

    data_types.forEach(data_type => {
        prepareCurrentData("insert", cryptos, data_type, (err, cryptoList) => {
            if (err) {
                throw err;
            } else {
                let sql =
                    "INSERT IGNORE INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";
                connection.query(sql, [cryptoList], function (error, results) {
                    if (error) callback(error);
                    return results;
                });
            }
            console.log(`Finished inserting current ${data_type} data.`);
        })
    });
}

module.exports = insertCurrentData;

