var axios = require("axios");
const db = require("./../db");

//insert list of cryptos
function insertCryptoList() {
  let cryptoList = [];
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
      let coinInfo = [
        Number.parseInt(coin.CoinInfo.Id),
        coin.CoinInfo.FullName
      ];
      cryptoList.push(coinInfo);
    });

    var sql = "INSERT INTO CryptoList (crypto_id, crypto_name) VALUES ?";

    db.connection.query(sql, [cryptoList], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = { insertCryptoList };
