const api_key = require("../..utilities/api_key");
const get = require("axios");

function getHistoricalPrice(crypto_info, limit, callback) {
    let i = 0;
    let request_url = "";
    let last_timestamp = "";
    let cryptoData = [];

    if (!last_timestamp) {
        request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&?${api_key}`;
        callAPI(request_url);
    }

    function callAPI(request_url) {
        const request = get(request_url)
            .then(response => {
                if (Object.keys(response.data.RateLimit).length > 0) {
                    console.log(response.data.RateLimit);
                }
                if (response.data.Response === "Error") {
                    console.log(
                        "[Error in Historical Price API Call]: " +
                            response.data.Message
                    );
                } else {
                    return response.data.Data;
                }
            })
            .catch(error => {
                callback(error);
            });

        request
            .then(historical_data => {
                if (Array.isArray(historical_data)) {
                    if (Object.entries(historical_data).length !== 0) {
                        last_timestamp = historical_data[1].time;

                        historical_data.forEach(data => {
                            cryptoData.push([
                                data.time,
                                crypto_info.crypto_id,
                                data.volumeto
                            ]);
                        });

                        request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&toTs=${last_timestamp}&?${api_key}`;
                        if (
                            new Date(
                                last_timestamp * 1000
                            ).toLocaleDateString() < "7/7/2018" &&
                            limit === 2000
                        ) {
                            console.log(
                                new Date(
                                    last_timestamp * 1000
                                ).toLocaleDateString()
                            );
                            callAPI(request_url);
                        } else {
                            callback(null, cryptoData);
                        }
                    }
                }
            })
            .catch(error => {
                callback(error);
            });
    }
}

module.exports = getHistoricalPrice;
