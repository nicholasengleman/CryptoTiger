const connection = require("../../utilities/db");
const getCurrentMarketCap = require("./getCurrentMarketCap");
const getCryptoListTable = require("../../utilities/getCryptoListTable");

function updateCurrentMarketCapData(callback) {
    getCryptoListTable(function(CRYPTO_LIST_TABLE) {
        getCurrentMarketCap((err, cryptos) => {
            if (err) throw err;
            let cryptoList = [];

            //creates array of of arrays for inserting into db
            cryptos.forEach(crypto => {
                const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;
                cryptoList.push([crypto.mktcap, 1, crypto_id]);
            });

            let sql = `UPDATE crypto_price_current SET market_cap = ? WHERE data_id = ? AND crypto_id = ?`;

            for (i = 0; i < cryptoList.length; i++) {
                connection.query(sql, cryptoList[i], function(error, results) {
                    if (error) {
                        callback(error);
                    }
                });
            }
            console.log(
                `Finished updating ${i} cryptos with their current market cap.`
            );
            callback(cryptoList);
        });
    });
}

updateCurrentMarketCapData();

//module.exports = updateCurrentPriceData;
