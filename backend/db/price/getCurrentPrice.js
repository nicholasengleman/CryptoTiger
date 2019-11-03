const api_key = require("../utilities/api_key");
const get = require("axios");

const getCryptoListTable = require("../utilities/getCryptoListTable");

function getCurrentPrice() {
    return new Promise((resolve, reject) => {
        getCryptoListTable().then(CRYPTO_LIST_TABLE => {
            let cryptoList = "";
            Object.keys(CRYPTO_LIST_TABLE).forEach(crypto => {
                if (isNaN(crypto)) {
                    cryptoList +=
                        cryptoList.length !== 0 ? "," + crypto : crypto;
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
                })
                .then(historical_data => {
                    let processedCryptoList = [];
                    Object.keys(historical_data.RAW).forEach(function(crypto) {
                        processedCryptoList.push({
                            price: historical_data.RAW[crypto].USD.PRICE,
                            shortname:
                                historical_data.RAW[crypto].USD.FROMSYMBOL
                        });
                    });
                    resolve(processedCryptoList);
                });
        });
    });
}

module.exports = getCurrentPrice;
