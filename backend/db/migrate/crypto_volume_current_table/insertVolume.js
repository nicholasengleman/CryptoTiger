const connection = require("./../../utilities/db");
const getCurrentVolume = require("./../../utilities/getCurrentVolume");
const DATA_INFO_OBJECT = require("./../../utilities/DataInfoObject");
const getCryptoListTable = require("./../../utilities/getCryptoListTable");


function insertVolume() {
    getCurrentVolume((err, cryptos) => {
        if (err) throw err;

        insertDataInTable(cryptos, err => {
            if (err) throw err;
        });
    });
}

function insertDataInTable(cryptos, callback) {

    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {

        let data_types = Object.keys(cryptos[0]).filter(el => {
            return el !== 'shortname';
        });



        data_types.forEach(data_type => {

            let cryptoList = [];

            cryptos.forEach(crypto => {
                // const data_id = DATA_INFO_OBJECT["Price"];
                const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;
                const datetime = 0;

                cryptoList.push([crypto_id, datetime, crypto.volume]);
            });

            let sql = `INSERT IGNORE INTO crypto_volume_current (crypto_id, data_id, data_value) VALUES ?`;
            connection.query(sql, [cryptoList], function (error, results) {
                if (error) callback(error);
                console.log(`Finished inserting ${results.changedRows} rows of current ${data_type} data.`);
            });

        });
    });
}


insertVolume();

module.exports = insertVolume;

