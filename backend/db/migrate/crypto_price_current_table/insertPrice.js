const db = require("./../../utilities/db");
const getCurrentPrice = require("./../../price/getCurrentPrice");
const getCryptoListTable = require("./../../utilities/getCryptoListTable");

function insertPrice() {
    getCryptoListTable().then(CRYPTO_LIST_TABLE => {
        let cryptoList = [];

        getCurrentPrice().then(cryptos => {
            cryptos.forEach(crypto => {
                cryptoList.push([
                    1,
                    CRYPTO_LIST_TABLE[crypto.shortname].crypto_id,
                    crypto.price
                ]);
            });

            let sql = `INSERT IGNORE INTO crypto_price_current (data_id, crypto_id, data_value) VALUES ?`;

            db.query(sql, [cryptoList], function(error, results) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(
                        `Finished inserting ${results.changedRows} rows of current data.`
                    );
                }
            });
        });
    });
}

insertPrice();

//module.exports = insertPrice;
