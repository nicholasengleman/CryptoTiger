const api_key = require("../utilities/api_key");
const get = require("axios");

const getCryptoListTable = require("../../utilities/getCryptoListTable");

function getCurrentMktCap(callback) {
    getCryptoListTable(CRYPTO_LIST_TABLE => {
        let cryptoList = "";

        Object.keys(CRYPTO_LIST_TABLE).forEach(crypto => {
            if (isNaN(crypto)) {
                cryptoList += cryptoList.length !== 0 ? "," + crypto : crypto;
            }
        });

        const request = get(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoList}&tsyms=USD&?${api_key}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                callback(error);
            });

        request.then(historical_data => {
            let processedCryptoList = [];

            Object.keys(historical_data.RAW).forEach(function(crypto) {
                processedCryptoList.push({
                    mktcap: historical_data.RAW[crypto].USD.MKTCAP,
                    shortname: historical_data.RAW[crypto].USD.FROMSYMBOL
                });
            });

            callback(null, processedCryptoList);
        });
    });
}

module.exports = getCurrentMktCap;
