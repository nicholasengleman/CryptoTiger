const connection = require("./../db");

function getCryptoShortnames(callback) {
    //returns shortnames of all cryptos in database
    let sql = "SELECT crypto_id, crypto_shortname FROM CryptoList";
    connection.query(sql, function (err, results) {
        callback(err, results);
    });
}

module.exports = getCryptoShortnames;


