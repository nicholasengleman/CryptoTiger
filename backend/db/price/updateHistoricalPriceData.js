const db = require("./../utilities/db");
const getCryptoListTable = require("./../utilities/getCryptoListTable");
const healthCheck = require("./healthCheck");

function updateHistoricalPriceData() {
    const getCryptoListTablePromise = getCryptoListTable();

    getCryptoListTablePromise
        .then(function(CRYPTO_LIST_TABLE) {
            let cryptoList = [];

            Object.keys(CRYPTO_LIST_TABLE).forEach(crypto => {
                if (isNaN(crypto)) {
                    cryptoList.push({
                        crypto_shortname: crypto,
                        crypto_id: CRYPTO_LIST_TABLE[crypto].crypto_id
                    });
                }
            });
            healthCheck(0, cryptoList);
        })
        .catch(e => {
            console.log(e);
        });
}

module.exports = updateHistoricalPriceData;
