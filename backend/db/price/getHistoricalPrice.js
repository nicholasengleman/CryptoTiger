const api_key = require("../utilities/api_key");
const get = require("axios");

function getHistoricalPrice(crypto_info, limit) {
    let i = 0;
    let request_url = "";
    let last_timestamp = "";
    let cryptoData = [];

    return new Promise((resolve, reject) => {
        if (!last_timestamp) {
            request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&?${api_key}`;
            checkHistoricalData(request_url).then(cryptoData => {
                resolve(cryptoData);
                reject(error);
            });
        }

        function checkHistoricalData(request_url) {
            return new Promise((resolve, reject) => {
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
                    .catch(e => {
                        console.log(e);
                    });
                request
                    .then(historical_data => {
                        if (Array.isArray(historical_data)) {
                            if (Object.entries(historical_data).length !== 0) {
                                historical_data.forEach(data => {
                                    if (crypto_info.crypto_id === "1182") {
                                        console.log(data.close);
                                    }
                                    cryptoData.push([
                                        data.time,
                                        crypto_info.crypto_id,
                                        data.close
                                    ]);
                                });

                                last_timestamp = historical_data[1].time;

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
                                    request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&toTs=${last_timestamp}&?${api_key}`;
                                    return resolve(
                                        checkHistoricalData(request_url)
                                    );
                                } else {
                                    return resolve(cryptoData);
                                }
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        }
    });
}

module.exports = getHistoricalPrice;
