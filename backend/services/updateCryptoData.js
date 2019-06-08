var axios = require("axios");
const db = require("../db/db");
const DATA_ID_MAP = require("./../db/data_id_map");

function getUpdateCryptoNumberValues() {
  var new_data = [];
  const request = axios
    .get(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?" +
        api_key +
        ""
    )
    .then(response => {
      return response.data.Data;
    })
    .catch(error => {
      console.log(error);
    });

  request.then(data => {
    data.forEach(coin => {
      for (const key of Object.keys(DATA_ID_MAP)) {
        var new_info = [
          DATA_ID_MAP[key],
          Number.parseInt(coin.CoinInfo.Id),
          Number.parseFloat(coin.RAW.USD[key])
        ];
        new_data.push(new_info);
      }
    });

    var sql =
      "INSERT INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";

    db.connection.query(sql, [new_data], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = { getUpdateCryptoNumberValues };
