const connection = require("../db/utilities/db");
const timeframeList = require("../server_tables/timeframeList");

function getDefaultData(callback) {

    let data = {};

    let cryptoListPromise = getCryptoList()
        .then(results => data[0] = results)
        .catch(err => console.log("error:", err.message));

    let getCurrentPricePromise = getCurrentPrice()
        .then(results => data[1] = {
            name: "Current Price",
            period: 0,
            data: results
        })
        .catch(err => console.log("error:", err.message));

    let getDataPromise_1 = getPriceData(timeframeList['1H'].seconds)
        .then(results => data[2] = {
            name: timeframeList['1H'].name,
            period: timeframeList['1H'].period,
            data: results
        })
        .catch(err => console.log("error:", err.message));

    let getDataPromise_2 = getPriceData(timeframeList['3H'].seconds)
        .then(results => data[3] = {
            name: timeframeList['3H'].name,
            period: timeframeList['3H'].period,
            data: results
        })
        .catch(err => console.log("error:", err.message));

    let getDataPromise_3 = getVolumeData(timeframeList['3H'].seconds)
        .then(results => data[4] = {
            name: timeframeList['6H'].name,
            period: timeframeList['6H'].period,
            data: results
        })
        .catch(err => console.log("error:", err.message));


    let getDataPromise_4 = getVolumeData(timeframeList['6H'].seconds)
        .then(results => data[4] = {
            name: timeframeList['6H'].name,
            period: timeframeList['6H'].period,
            data: results
        })
        .catch(err => console.log("error:", err.message));


    let getDataPromise_5 = getVolumeData(timeframeList['6H'].seconds)
        .then(results => data[4] = {
            name: timeframeList['6H'].name,
            period: timeframeList['6H'].period,
            data: results
        })
        .catch(err => console.log("error:", err.message));


    Promise.all([cryptoListPromise, getCurrentPricePromise, getDataPromise_1, getDataPromise_2, getDataPromise_3, getDataPromise_4, getDataPromise_5])
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
    }

    function getCurrentPrice() {
        return new Promise((resolve, reject) => {
            var sql = `select * from crypto_price_current`;
            connection.query(sql, function (err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }


    function getPriceData(timeframe) {
        let time_since_1970_in_seconds = new Date().getTime() / 1000;
        return new Promise((resolve, reject) => {
            var sql = `SELECT crypto_datetime, crypto_id, data_value
                       from crypto_price_historical
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${timeframe})
                       order by crypto_datetime DESC
                       LIMIT 100`;

            connection.query(sql, function (err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }

    function getVolumeData(timeframe) {
        let time_since_1970_in_seconds = new Date().getTime() / 1000;
        return new Promise((resolve, reject) => {
            var sql = `SELECT crypto_datetime, crypto_id, data_value
                       from crypto_volume_historical
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${timeframe})
                       order by crypto_datetime DESC
                       LIMIT 100`;

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
