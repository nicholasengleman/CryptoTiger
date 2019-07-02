const api_key = require("../../utilities/api_key");
const get = require("axios");

const getDataInfoTable = require("../../utilities/getDataInfoTable");
const getCryptoListTable = require("../../utilities/getCryptoListTable");

function getHistoricalPrice(timeframe, callback) {

    getDataInfoTable((err, DATA_INFO_TABLE) => {
        if (typeof DATA_INFO_TABLE["price"][timeframe] === "undefined") {
            callback("Invalid Timeframe");
        } else {
            let length = Object.keys(DATA_INFO_TABLE["price"][timeframe]).length;

            getCryptoListTable((err, CRYPTO_LIST_TABLE) => {
                let cryptoList = [];
                Object.keys(CRYPTO_LIST_TABLE).forEach((crypto) => {
                    if (isNaN(crypto)) {
                        cryptoList.push({shortname: crypto, crypto_id: CRYPTO_LIST_TABLE[crypto].crypto_id });
                    }
                });

                let i = 0;
                let interval_id = setInterval(() => {
                    const request = get(`https://min-api.cryptocompare.com/data/histo${timeframe}?fsym=${cryptoList[i].shortname}&tsym=USD&limit=${length - 1}&?${api_key}`)
                        .then(response => {
                            if (Object.keys(response.data.RateLimit).length > 0) {
                                console.log(response.data.RateLimit);
                            }
                            return response.data.Data;
                        })
                        .catch(error => {
                            console.log(error);
                            callback(error);
                        });

                    request.then(historical_data => {

                        if (cryptoList[i]) {
                            let callbackstr = {};
                            callbackstr.i = i;
                            callbackstr.crypto_id = cryptoList[i].crypto_id;
                            callbackstr.historical_data = historical_data;
                            callback(null, callbackstr);
                        }
                    });
                    i++;
                    if (!cryptoList[i] || i > cryptoList.length) {
                        clearInterval(interval_id);
                    }
                }, 400);

            })
        }
    });
}


module.exports = getHistoricalPrice;
