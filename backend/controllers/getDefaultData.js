const connection = require("../db/utilities/db");
const DATA_INFO_TABLE = require("../db/utilities/dataInfoTable");

function getDefaultData(callback) {
    let data = {};

    let cryptoListPromise = getCryptoList()
        .then(results => (data[0] = results))
        .catch(err => console.log("error:", err.message));

    let getCurrentPricePromise = getCurrentPrice()
        .then(
            results =>
                (data[1] = {
                    name: "Current Price",
                    period: 0,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_1 = getPriceData(DATA_INFO_TABLE["1H"].seconds)
        .then(
            results =>
                (data[2] = {
                    name: DATA_INFO_TABLE["1H"].name + " Price",
                    period: DATA_INFO_TABLE["1H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_2 = getPriceData(DATA_INFO_TABLE["2H"].seconds)
        .then(
            results =>
                (data[3] = {
                    name: DATA_INFO_TABLE["2H"].name + " Price",
                    period: DATA_INFO_TABLE["2H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_3 = getPriceData(DATA_INFO_TABLE["3H"].seconds)
        .then(
            results =>
                (data[4] = {
                    name: DATA_INFO_TABLE["3H"].name + " Price",
                    period: DATA_INFO_TABLE["3H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_4 = getPriceData(DATA_INFO_TABLE["4H"].seconds)
        .then(
            results =>
                (data[5] = {
                    name: DATA_INFO_TABLE["4H"].name + " Price",
                    period: DATA_INFO_TABLE["4H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_5 = getPriceData(DATA_INFO_TABLE["5H"].seconds)
        .then(
            results =>
                (data[6] = {
                    name: DATA_INFO_TABLE["5H"].name + " Price",
                    period: DATA_INFO_TABLE["5H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_6 = getPriceData(DATA_INFO_TABLE["6H"].seconds)
        .then(
            results =>
                (data[7] = {
                    name: DATA_INFO_TABLE["6H"].name + " Price",
                    period: DATA_INFO_TABLE["6H"].period,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    Promise.all([
        cryptoListPromise,
        getCurrentPricePromise,
        getDataPromise_1,
        getDataPromise_2,
        getDataPromise_3,
        getDataPromise_4,
        getDataPromise_5,
        getDataPromise_6
    ])
        .then(function(data) {
            callback(data);
        })
        .catch(err => console.log("error:", err.message));

    function getCryptoList() {
        return new Promise((resolve, reject) => {
            var sql = `SELECT *
                       FROM CryptoList`;
            connection.query(sql, function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    function getCurrentPrice() {
        return new Promise((resolve, reject) => {
            var sql = `select * from crypto_price_current`;
            connection.query(sql, function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    function getPriceData(timeframe) {
        let time_since_1970_in_seconds = new Date().getTime() / 1000;
        return new Promise((resolve, reject) => {
            var sql = `SELECT crypto_datetime, crypto_id, data_value
                       from crypto_price_historical
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${timeframe})
                       order by crypto_datetime DESC
                       LIMIT 100`;

            connection.query(sql, function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    function getVolumeData(timeframe) {
        let time_since_1970_in_seconds = new Date().getTime() / 1000;
        return new Promise((resolve, reject) => {
            var sql = `SELECT crypto_datetime, crypto_id, data_value
                       from crypto_volume_historical
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${timeframe})
                       order by crypto_datetime DESC
                       LIMIT 100`;

            connection.query(sql, function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = getDefaultData;
