const api_key = require("../api_key");
const get = require("axios");
const getDataInfoTable = require("../utilities/getDataInfoTable");

function getHistoricalData(data, timeframe, callback) {

    getDataInfoTable((err, DATA_INFO_TABLE) => {
        if (typeof DATA_INFO_TABLE["price"][timeframe] === "undefined") {
            callback("Invalid Timeframe");
        } else {

            let length = Object.keys(DATA_INFO_TABLE["price"][timeframe]).length;
            let i = 0;

            let interval_id = setInterval(() => {
                const request = get(`https://min-api.cryptocompare.com/data/histo${timeframe}?fsym=${data[i].crypto_shortname}&tsym=USD&limit=${length - 1}&?${api_key}`)
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

                    if (data[i]) {
                        let callbackstr = {};
                        callbackstr.i = i;
                        callbackstr.crypto_id = data[i].crypto_id;
                        callbackstr.historical_data = historical_data;
                        callback(null, callbackstr);
                    }
                });
                i++;
                if (!data[i] || i > data.length) {
                    clearInterval(interval_id);
                }
            }, 400);
        }
    });
}


module.exports = getHistoricalData;
