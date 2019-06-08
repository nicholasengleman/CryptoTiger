const db = require("../db/db");

function updateCryptoData(callback) {
  var sql = "SELECT * FROM CryptoNumberDataValues";
  db.connection.query(sql, function(error, results) {
    if (error) {
      return error;
    } else {
      return callback(results);
    }
  });
}

module.exports = { updateCryptoData };
