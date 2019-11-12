const connection = require("./../utilities/db");
const getCurrentPrice = require("./getCurrentPrice");
const getCryptoListTable = require("./../utilities/getCryptoListTable");

function updateCurrentPriceData(callback) {
    getCurrentPrice()
        .then(cryptos => {
            getCryptoListTable().then(CRYPTO_LIST_TABLE => {
                let data_types = Object.keys(cryptos[0]).filter(el => {
                    return el !== "shortname";
                });

                data_types.forEach(data_type => {
                    let i = 0;
                    let cryptoList = [];

                    cryptos.forEach(crypto => {
                        const crypto_id =
                            CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;
                        cryptoList.push([crypto.price, 1, crypto_id]);
                    });

                    let sql = `UPDATE crypto_price_current SET data_value = ? WHERE data_id = ? AND crypto_id = ?`;

                    for (i = 0; i < cryptoList.length; i++) {
                        connection.query(sql, cryptoList[i], function(
                            error,
                            results
                        ) {
                            if (error) {
                                callback(error);
                            }
                        });
                    }

                    console.log(
                        `Finished updating ${i} cryptos with their current ${data_type} data at ${new Date()}`
                    );
                    callback(null, cryptoList);
                });
            });
        })
        .catch(e => error(console.log(e)));
}

module.exports = updateCurrentPriceData;
