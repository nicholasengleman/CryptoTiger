// this function is used for managing the bulk downloading of historical data going back to the date specified in the
// getHistoricalDataPrice function

const db = require("../../../utilities/db");

const getCryptoListTable = require("../../../utilities/getCryptoListTable");
const getHistoricalVolume = require("../../volume/getHistoricalVolume");

function getHistoricalPriceManager(callback) {
    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {
        let cryptoList = [];
        Object.keys(CRYPTO_LIST_TABLE).forEach(crypto => {
            if (isNaN(crypto)) {
                cryptoList.push({
                    crypto_shortname: crypto,
                    crypto_id: CRYPTO_LIST_TABLE[crypto].crypto_id
                });
            }
        });

        let i = 0;

        callNextCrypto(i);

        function callNextCrypto(i) {
            getHistoricalVolume(cryptoList[i], 2000, (err, cryptoData) => {
                if (err) throw err;

                var sql = `INSERT IGNORE INTO crypto_volume_historical (crypto_datetime, crypto_id, data_value) VALUES ?`;
                db.query(sql, [cryptoData], function(error, results) {
                    if (error) throw error;
                    console.log(
                        `#${i} ${cryptoList[i].crypto_shortname}: ${results.changedRows} rows changed.`
                    );
                    i++;
                    if (i < 100) {
                        callNextCrypto(i);
                    }
                });
            });
        }
    });
}

getHistoricalPriceManager();
