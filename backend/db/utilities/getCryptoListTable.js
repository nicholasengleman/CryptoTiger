const connection = require("./../db");
const util = require('util');

const getCryptoListTable = callback => {
    let sql =
        "SELECT crypto_id, crypto_name, crypto_shortname FROM CryptoList";
    connection.query(sql, function (error, results = "") {
        if (error) {
            callback(error);
        } else {
            let CRYPTO_LIST_TABLE = {};

            results.forEach(function (crypto) {
                CRYPTO_LIST_TABLE = {
                    ...CRYPTO_LIST_TABLE,
                    [crypto.crypto_id]: {
                        'crypto_name': crypto.crypto_name,
                        'crypto_shortname': crypto.crypto_shortname,
                    },
                    [crypto.crypto_shortname]: {
                        'crypto_id': crypto.crypto_id,
                        'crypto_name': crypto.crypto_name,
                    }
                }
            });

            callback(null, CRYPTO_LIST_TABLE);
        }
    });
};


module.exports = getCryptoListTable;


