const api_key = require("../api_key");
const get = require("axios");
const util = require('util');


function getCurrentData(cryptos, callback) {
    let cryptoList = "";
    cryptos.forEach(function (crypto, i) {
        cryptoList += (i !== 0 ? "," + crypto.crypto_shortname : crypto.crypto_shortname);
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

        //  console.log(util.inspect(historical_data, {showHidden: false, depth: null}));

        let processedCryptoList = [];

        Object.keys(historical_data.RAW).forEach(function (crypto) {
            processedCryptoList.push({
                price: historical_data.RAW[crypto].USD.PRICE,
                shortname: historical_data.RAW[crypto].USD.FROMSYMBOL
            })
        });

        //console.log(util.inspect(processedCryptoList, {showHidden: false, depth: null}));

        callback(null, processedCryptoList);
    });
}


module.exports = getCurrentData;
