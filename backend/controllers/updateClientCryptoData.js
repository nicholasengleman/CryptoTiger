const connection = require("./../db/db");

function updateClientCryptoData(callback) {
  var sql =
    "SELECT crypto_id, CryptoNumberDataValues.data_id, data_name, data_period_type, data_period, data_type, data_value FROM CryptoNumberDataValues LEFT JOIN DataInfo on CryptoNumberDataValues.data_id = DataInfo.data_id";
  connection.query(sql, function(error, results) {
    if (error) {
      return error;
    } else {
      return callback(results);
    }
  });
}

module.exports = updateClientCryptoData;
