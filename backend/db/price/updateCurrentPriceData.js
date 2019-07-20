const connection = require("./../utilities/db");
const getCurrentPrice = require("./../utilities/getCurrentPrice");
const DATA_INFO_OBJECT = require("./../utilities/DataInfoObject");
const getCryptoListTable = require("./../utilities/getCryptoListTable");

function updateCurrentPriceData() {
    getCurrentPrice((err, cryptos) => {
        if (err) throw err;

        updateDataInTable(cryptos, err => {
            if (err) throw err;
        });
    });
}

function updateDataInTable(cryptos, callback) {
    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {

        let data_types = Object.keys(cryptos[0]).filter(el => {
            return el !== 'shortname';
        });

        data_types.forEach(data_type => {
            let cryptoList = [];

            cryptos.forEach(crypto => {
               // const data_id = DATA_INFO_OBJECT["Price"];
                const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;

                cryptoList.push([crypto.price, 0, crypto_id]);
            });

            let sql = `UPDATE CryptoNumberDataValues SET data_value = ? WHERE crypto_datetime = ? AND crypto_id = ?`;

            for (let i = 0; i < cryptoList.length; i++) {
                connection.query(sql, cryptoList[i], function (error, results) {
                    if (error) {
                        callback(error);
                    }
                });
            }

            console.log(`Finished updating current ${data_type} data.`);
        });
    });
}

updateCurrentPriceData();


module.exports = updateCurrentPriceData;
