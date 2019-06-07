const dbConnect = require("./dbConnect");

function updateCryptoData(callback) {
  var sql = "SELECT * FROM CryptoNumberDataValues";
  dbConnect.connection.query(sql, function(error, results) {
    if (error) {
      return error;
    } else {
      return callback(results);
    }
  });
}

module.exports = { updateCryptoData };
