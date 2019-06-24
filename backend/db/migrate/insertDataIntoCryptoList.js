/*
  Creates and Inserts list of Cryptos with their id, fullname and shortname

 */

var axios = require("axios");
const db = require("../db");
const api_key = require("../api_key");


//insert list of cryptos into CryptoList table
function insertDataIntoCryptoList() {
    let cryptoList = [];
    const request = axios
        .get(
            "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&?" +
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
                coin.CoinInfo.FullName,
                coin.CoinInfo.Name
            ];
            cryptoList.push(coinInfo);
       });

        console.log(cryptoList);

        var sql = "INSERT IGNORE INTO CryptoList (crypto_id, crypto_name, crypto_shortname) VALUES ?";

        db.connection.query(sql, [cryptoList], function (error, results) {
            if (error) throw error;
            console.log(results);
        });

    });
}

module.exports = insertDataIntoCryptoList;
