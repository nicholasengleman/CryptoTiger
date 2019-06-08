var axios = require("axios");
const db = require("./../db");

//insert data info
function insertDataInfo() {
  let dataInfo = [];

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
    let currentPrice = ["PRICE_CURRENT_0", "Current Price", "current", 0];
    let currentMKTCP = ["MKCAP_CURRENT_0", "Current Market Cap", "current", 0];

    dataInfo.push(currentPrice, currentMKTCP);

    var sql =
      "INSERT INTO DataInfo (data_id, data_name, data_period_type, data_period) VALUES ?";

    db.connection.query(sql, [dataInfo], function(error, results) {
      if (error) throw error;
      dbConnect.connection.end();
      console.log(results);
    });
  });
}

module.exports = { insertDataInfo };
