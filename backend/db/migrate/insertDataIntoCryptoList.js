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





//TODO:Insert Periods and Crypto_id into CryptoNumberDataValues and CryptoStringDataValues

/*
  var sql = "INSERT INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";

                    db.connection.query(sql, [cryptoList], function(error, results) {
                        if (error) throw error;
                        console.log(results);
                    });


function getCryptoIDsShortnames(callback) {
    var sql =
        "SELECT crypto_id, crypto_shortname FROM CryptoList";
    db.connection.query(sql, function (error, results) {
        if (error) {
            return error;
        } else {
            return callback(results);
        }
    });
}


function updateDBNumberTable() {
    let cryptoList = [];
    /*
       1) Get new historical data from api
           a) select all the crypto shortnames from the CryptoInfo table
           b) iterate over these returns values and for each one, call the historical data api

     */
//
// getCryptoIDsShortnames(function (result) {
//     result.forEach((data, i) => {
//         if (i < 1) {
//             const request = axios
//                 .get(
//                     "https://min-api.cryptocompare.com/data/histohour?fsym="+data.crypto_shortname+"&tsym=USD&limit=9&?" +
//                     api_key +
//                     ""
//                 )
//                 .then(response => {
//                     return response.data.Data
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//
//             request.then( coindata => {
//                 coindata.forEach(coin => {
//                     /*
//                     2) Calculate the Data_id
//                         a) From the time data returned from the api, calculate the hours since current time for each data timepoint
//                         b) plug those hours into the DATA_ID_MAP to return the data id
//                      */
//
//                     let data_id = 0;
//                     let period = (((new Date() - new Date(coin.time * 1000)) / 1000 / 60 / 60) + 1).toFixed(0);
//                     if (Object.keys(DATA_ID_MAP.PRICE.HOUR).length >= period) {
//                         data_id = DATA_ID_MAP.PRICE.HOUR[period];
//                     } else {
//                         data_id = "";
//                     }
//
//                     /*
//                    2) Calculate the Crypto_id
//                       a) get the crypto id that was retrieved from the CryptoList Table
//
//                     */
//
//
//                     let coinInfo = [data_id, data.crypto_id, coin.close];
//                     cryptoList.push(coinInfo);
//                 });
//
//                 // console.log(cryptoList);
//
//                 var sql = "INSERT INTO CryptoNumberDataValues (data_id, crypto_id, data_value) VALUES ?";
//
//                 db.connection.query(sql, [cryptoList], function(error, results) {
//                     if (error) throw error;
//                     console.log(results);
//                 });
//             })
//
//                 .catch(function (err) {
//                     console.log(err);
//                 })
//         }
//     })
// });



module.exports = insertDataIntoCryptoList;
