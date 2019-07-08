const connection = require("../../../utilities/db");
const getCurrentData = require("../../utilities/getCurrentPrice");
const prepareCurrentData = require("../../utilities/processCurrentPriceData");

function insertCurrentPrice() {
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
                    console.log(`Finished inserting ${results.changedRows} rows of current ${data_type} data.`);
                    return results;
                });
            }

        })
    });
}

module.exports = insertCurrentPrice;

