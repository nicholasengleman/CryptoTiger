const connection = require("./../db/utilities/db");
const dataInfo = require("./../db/utilities/dataInfo");

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

    let getDataPromise_1 = getPriceData(dataInfo("price", "hour", 1).seconds)
        .then(
            results =>
                (data[2] = {
                    type: dataInfo("price", "hour", 1).type,
                    group: dataInfo("price", "hour", 1).group,
                    period: dataInfo("price", "hour", 1).period,
                    name: dataInfo("price", "hour", 1).name,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_2 = getPriceData(dataInfo("price", "hour", 2).seconds)
        .then(
            results =>
                (data[3] = {
                    type: dataInfo("price", "hour", 2).type,
                    group: dataInfo("price", "hour", 2).group,
                    period: dataInfo("price", "hour", 2).period,
                    name: dataInfo("price", "hour", 2).name,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_3 = getPriceData(dataInfo("price", "hour", 3).seconds)
        .then(
            results =>
                (data[4] = {
                    type: dataInfo("price", "hour", 3).type,
                    group: dataInfo("price", "hour", 3).group,
                    period: dataInfo("price", "hour", 3).period,
                    name: dataInfo("price", "hour", 3).name,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_4 = getPriceData(dataInfo("price", "hour", 4).seconds)
        .then(
            results =>
                (data[5] = {
                    type: dataInfo("price", "hour", 4).type,
                    group: dataInfo("price", "hour", 4).group,
                    period: dataInfo("price", "hour", 4).period,
                    name: dataInfo("price", "hour", 4).name,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_5 = getPriceData(dataInfo("price", "hour", 5).seconds)
        .then(
            results =>
                (data[6] = {
                    type: dataInfo("price", "hour", 5).type,
                    group: dataInfo("price", "hour", 5).group,
                    period: dataInfo("price", "hour", 5).period,
                    name: dataInfo("price", "hour", 5).name,
                    data: results
                })
        )
        .catch(err => console.log("error:", err.message));

    let getDataPromise_6 = getPriceData(dataInfo("price", "hour", 6).seconds)
        .then(
            results =>
                (data[7] = {
                    type: dataInfo("price", "hour", 6).type,
                    group: dataInfo("price", "hour", 6).group,
                    period: dataInfo("price", "hour", 6).period,
                    name: dataInfo("price", "hour", 6).name,
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
