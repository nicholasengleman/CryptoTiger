const api_key = require("../api_key");
const get = require("axios");

function getHistoricalData(data, timeframe, lookback_period, callback) {
    let i = 0;
    let interval_id = setInterval(() => {
        const request = get(
            "https://min-api.cryptocompare.com/data/histo"+timeframe+"?fsym=" +
            data[i].crypto_shortname +
            "&tsym=USD&limit="+(lookback_period - 1)+"&?" +
            api_key +
            ""
        )
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


module.exports = getHistoricalData;
