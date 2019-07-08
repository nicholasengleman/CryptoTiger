const api_key = require("./../../utilities/api_key");
const get = require("axios");


function getHistoricalPrice(crypto_info, callback) {
    let i = 0;
    let request_url = "";
    let last_timestamp = "";
    let cryptoData = [];

    if (!last_timestamp) {
        request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=2000&?${api_key}`;
        callAPI(request_url);
    }


    function callAPI(request_url) {
        const request = get(request_url)
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
            if(Object.entries(historical_data).length !== 0) {
                last_timestamp = historical_data[1].time;

                historical_data.forEach(data => {
                    cryptoData.push([data.time, crypto_info.crypto_id, data.close ]);
                });

                request_url = `https://min-api.cryptocompare.com/data/histohour?fsym=${crypto_info.crypto_shortname}&tsym=USD&limit=2000&toTs=${last_timestamp}&?${api_key}`;
                if (new Date(last_timestamp * 1000).toLocaleDateString() < "7/7/2018") {
                    console.log(new Date(last_timestamp * 1000).toLocaleDateString());
                    callAPI(request_url);
                } else {
                    callback(null, cryptoData);
                }
            } else {
                console.log(historical_data);

            }
        });
    }
}


module.exports = getHistoricalPrice;
