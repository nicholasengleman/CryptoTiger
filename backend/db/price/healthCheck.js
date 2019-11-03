const db = require("../utilities/db");
const getHistoricalPrice = require("./getHistoricalPrice");

let current_time = new Date();
let sql = `SELECT crypto_datetime, crypto_id from crypto_price_historical WHERE crypto_id = ? ORDER BY crypto_datetime DESC LIMIT 1`;

function healthCheck(i, cryptoList) {
    // 1) get latest data
    // 2) if latest data is more than an hour old...
    // 3) load all historical data between now and latest data

    db.query(sql, [cryptoList[i].crypto_id], function(error, results) {
        if (error) {
            throw new Error(error);
        } else {
            let data_age =
                (current_time - results[0].crypto_datetime * 1000) /
                (1000 * 60 * 60);
            console.log(
                `${cryptoList[i].crypto_shortname}: updated ${data_age.toFixed(
                    2
                )} hours ago`
            );

            if (Math.floor(data_age) > 1) {
                getHistoricalPrice(cryptoList[i], parseInt(data_age)).then(
                    cryptoData => {
                        console.log(cryptoData);
                        var sql = `INSERT IGNORE INTO crypto_price_historical (crypto_datetime, crypto_id, data_value) VALUES ?`;

                        db.query(sql, [cryptoData], function(error, results) {
                            if (error) {
                                throw new Error();
                            } else {
                                console.log(
                                    `#${i} ${cryptoList[i].crypto_shortname}: ${results.changedRows} rows changed.`
                                );
                                i++;
                                if (i < 100) {
                                    healthCheck(i, cryptoList);
                                }
                            }
                        });
                    }
                );
            } else {
                i++;
                if (i < 100) {
                    healthCheck(i, cryptoList);
                }
            }
        }
    });
}

module.exports = healthCheck;
