const db = require("../utilities/db");

const getCryptoListTable = require("./../utilities/getCryptoListTable");
const getHistoricalVolume = require("../utilities/getHistoricalVolume");

function updateHistoricalPriceData(callback) {
    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {
        let cryptoList = [];
        Object.keys(CRYPTO_LIST_TABLE).forEach(crypto => {
            if (isNaN(crypto)) {
                cryptoList.push({'crypto_shortname': crypto, 'crypto_id': CRYPTO_LIST_TABLE[crypto].crypto_id});
            }
        });

        // 1) get latest data
        // 2) if latest data is more than an hour old...
        // 3) load all historical data between now and latest data

        let current_time = new Date();

        let i = 0;

        var sql = `SELECT crypto_datetime, crypto_id
                   from crypto_volume_historical
                   WHERE crypto_id = ?
                   ORDER BY crypto_datetime DESC
                   LIMIT 1`;

        healthCheck(i);

        function healthCheck(i) {
            db.query(sql, [cryptoList[i].crypto_id], function (error, results) {
                if (error) throw error;
                let data_age = (current_time - (results[0].crypto_datetime * 1000)) / (1000 * 60 * 60);

                console.log(`${cryptoList[i].crypto_shortname}: updated ${data_age.toFixed(2)} hours ago`);

                if (Math.floor(data_age) > 1) {
                    getHistoricalVolume(cryptoList[i], parseInt(data_age), (err, cryptoData) => {
                        if (err) console.log(err);
                        console.log(cryptoData);

                        var sql = `INSERT IGNORE INTO crypto_volume_historical (crypto_datetime, crypto_id, data_value) VALUES ?`;
                        db.query(sql, [cryptoData], function (error, results) {
                            if (error) throw error;
                            console.log(`#${i} ${cryptoList[i].crypto_shortname}: ${results.changedRows} rows changed.`);
                            i++;
                            if (i < 100) {
                                healthCheck(i);
                            }
                        });
                    })
                } else {
                    i++;
                    if (i < 100) {
                        healthCheck(i);
                    }
                }
            });
        }
    });
}

updateHistoricalPriceData();