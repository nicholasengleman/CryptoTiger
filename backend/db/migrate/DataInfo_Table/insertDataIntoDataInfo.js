const db = require("../../utilities/db");

//insert data info
function insertDataIntoDataInfo() {
  let dataInfo = [];

  let m1 = ["PRICE_HOUR_11", "11 Hour Price", "hour", 11, "price"];
  let m2 = ["PRICE_HOUR_12", "12 Hour Price", "hour", 12, "price"];


  dataInfo.push(m1, m2, m3, m4, m5, m6, m7, m8);

  var sql =
    "INSERT INTO DataInfo (data_id, data_name, data_period_type, data_period, data_type) VALUES ?";

  db.connection.query(sql, [dataInfo], function(error, results) {
    if (error) throw error;
    db.connection.end();
    console.log(results);
  });
}

insertDataIntoDataInfo();
