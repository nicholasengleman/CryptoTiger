const api_key = require("../utilities/api_key");
const get = require("axios");

function getHistoricalPrice(crypto_info, limit) {
    let i = 0;

    let cryptoData = [];

    return new Promise((resolve, reject) => {

        let request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&?${api_key}`;

        checkHistoricalData(request_url);

        function checkHistoricalData(request_url) {
            let last_timestamp = "";

            const request = get(request_url)
                .then(response => {
                    if (Object.keys(response.data.RateLimit).length > 0) {
                        console.log(response.data.RateLimit);
                    }
                    if (response.data.Response === "Error") {
                        reject(response.data.Message);
                    } else {
                        //   console.log(response.data.Data);
                        let historical_data = response.data.Data;

                        if (Array.isArray(historical_data) && Object.entries(historical_data).length !== 0) {
                            historical_data.forEach(data => {
                                cryptoData.push([
                                    data.time,
                                    crypto_info.crypto_id,
                                    data.close
                                ]);
                            });

                            //  console.log(cryptoData);

                            last_timestamp = historical_data[1].time;

                            console.log(new Date(last_timestamp * 1000).toLocaleDateString());

                            if (new Date(last_timestamp * 1000).toLocaleDateString() < "7/7/2018" && limit === 2000) {
                                console.log(new Date(last_timestamp * 1000).toLocaleDateString());
                                request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=${limit}&toTs=${last_timestamp}&?${api_key}`;
                                return resolve(checkHistoricalData(request_url));
                            } else {
                                return resolve(cryptoData);
                            }
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    });
}

module.exports = getHistoricalPrice;
