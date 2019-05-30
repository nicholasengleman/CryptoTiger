var axios = require("axios");

function callapi() {
    if (!api_key) {
        return callback(new Error('API key not entered'));
    }

    const request = axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?e059e20e2ac72a679e388f3b9e4e04e7523705d10ca496d0bb70889786e235a0")
        .then((response) => {
            return (response.data.Data);
        }).catch((error) => {
            console.log(error);
        });

    return request;
}

module.exports = {call: callapi}