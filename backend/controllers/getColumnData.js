const connection = require("../db/utilities/db");

function getColumnData(SECONDS, callback) {
    let time_since_1970_in_seconds = new Date().getTime() / 1000;

    var sql = `SELECT crypto_datetime, crypto_id, data_value
                       from crypto_price_historical
                       WHERE crypto_datetime < (${time_since_1970_in_seconds} - ${SECONDS})
                       order by crypto_datetime DESC
                       LIMIT 100`;

    connection.query(sql, function(err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });
}

module.exports = getColumnData;
