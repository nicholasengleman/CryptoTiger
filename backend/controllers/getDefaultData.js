const connection = require("../db/utilities/db");
const timeframeList = require("../timeframeList");

function getDefaultData(callback) {

    let data = [];

    let cryptoListPromise = getCryptoList()
        .then(results => data[0] = results)
        .catch(err => console.log("error:", err.message));

    let getDataPromise_1 = getData(timeframeList['1H'])
        .then(results => data[1] = results)
        .catch(err => console.log("error:", err.message));

    let getDataPromise_2 = getData(timeframeList['3H'])
        .then(results => data[2] = results)
        .catch(err => console.log("error:", err.message));

    let getDataPromise_3 = getData(timeframeList['6H'])
        .then(results => data[3] = results)
        .catch(err => console.log("error:", err.message));

    Promise.all([cryptoListPromise, getDataPromise_1, getDataPromise_2, getDataPromise_3])
        .then(function (data) {
            callback(data)
        })
        .catch(err => console.log("error:", err.message));


    function getCryptoList() {
        return new Promise((resolve, reject) => {

            var sql = `SELECT *
                       FROM CryptoList`;

            connection.query(sql, function (err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    };


    function getData(timeframe) {

        let time_since_1970_in_seconds = new Date().getTime() / 1000;

        return new Promise((resolve, reject) => {

            var sql = `SELECT MAX(crypto_datetime) as crypto_datetime, crypto_id
                       from CryptoNumberDataValues
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${timeframe})
                       GROUP BY crypto_id`;

            connection.query(sql, function (err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    };
}

module.exports = getDefaultData;