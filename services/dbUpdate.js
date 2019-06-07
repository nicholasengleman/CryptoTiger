var axios = require("axios");
const dbConnect = require("./dbConnect");

const api_key =
  "e059e20e2ac72a679e388f3b9e4e04e7523705d10ca496d0bb70889786e235a0";

const DATA_ID_MAP = {
  MKTCAP: "MKCAP_CURRENT_0",
  PRICE: "PRICE_CURRENT_0"
};

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

    dbConnect.connection.query(sql, [new_data], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = { getUpdateCryptoNumberValues };
