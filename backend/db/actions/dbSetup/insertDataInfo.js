const db = require("./.././../db");

//insert data info
function insertDataInfo() {
  let dataInfo = [];

  let m1 = ["PRICE_HOUR_11", "11 Hour Price", "hour", 11, "price"];
  let m2 = ["PRICE_HOUR_12", "12 Hour Price", "hour", 12, "price"];
  let m3 = ["PRICE_HOUR_13", "13 Hour Price", "hour", 13, "price"];
  let m4 = ["PRICE_HOUR_14", "14 Hour Price", "hour", 14, "price"];
  let m5 = ["PRICE_HOUR_15", "15 Hour Price", "hour", 15, "price"];
  let m6 = ["PRICE_HOUR_16", "16 Hour Price", "hour", 16, "price"];
  let m7 = ["PRICE_HOUR_17", "17 Hour Price", "hour", 17, "price"];
  let m8 = ["PRICE_HOUR_18", "18 Hour Price", "hour", 18, "price"];

  dataInfo.push(m1, m2, m3, m4, m5, m6, m7, m8);

  var sql =
    "INSERT INTO DataInfo (data_id, data_name, data_period_type, data_period, data_type) VALUES ?";

  db.connection.query(sql, [dataInfo], function(error, results) {
    if (error) throw error;
    db.connection.end();
    console.log(results);
  });
}

insertDataInfo();
