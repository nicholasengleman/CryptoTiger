const db = require("./db");

const getCryptoListTable = () => {
    let sql = "SELECT crypto_id, crypto_name, crypto_shortname FROM CryptoList";

    return new Promise(function(resolve, reject) {
        db.query(sql, function(error, results = "") {
            if (error) {
                reject(err);
            } else {
                let CRYPTO_LIST_TABLE = {};
                results.forEach(function(crypto) {
                    CRYPTO_LIST_TABLE = {
                        ...CRYPTO_LIST_TABLE,
                        [crypto.crypto_id]: {
                            crypto_name: crypto.crypto_name,
                            crypto_shortname: crypto.crypto_shortname
                        },
                        [crypto.crypto_shortname]: {
                            crypto_id: crypto.crypto_id,
                            crypto_name: crypto.crypto_name
                        }
                    };
                });
                resolve(CRYPTO_LIST_TABLE);
            }
        });
    });
};

module.exports = getCryptoListTable;
