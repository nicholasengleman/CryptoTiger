const db = require("./.././../db");

//insert data info
function insertDataInfo() {
  let dataInfo = [];

  let m1 = ["PRICE_HOUR_1", "1 Hour Price", "hour", 1, "price"];
  let m2 = ["PRICE_HOUR_2", "2 Hour Price", "hour", 2, "price"];
  let m3 = ["PRICE_HOUR_3", "3 Hour Price", "hour", 3, "price"];
  let m4 = ["PRICE_HOUR_4", "4 Hour Price", "hour", 4, "price"];
  let m5 = ["PRICE_HOUR_5", "5 Hour Price", "hour", 5, "price"];
  let m6 = ["PRICE_HOUR_6", "6 Hour Price", "hour", 6, "price"];
  let m7 = ["PRICE_HOUR_7", "7 Hour Price", "hour", 7, "price"];
  let m8 = ["PRICE_HOUR_8", "8 Hour Price", "hour", 8, "price"];
  let m9 = ["PRICE_HOUR_9", "9 Hour Price", "hour", 9, "price"];
  let m10 = ["PRICE_HOUR_10", "10 Hour Price", "hour", 10, "price"];

  dataInfo.push(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10);

  var sql =
    "INSERT INTO DataInfo (data_id, data_name, data_period_type, data_period, data_type) VALUES ?";

  db.connection.query(sql, [dataInfo], function(error, results) {
    if (error) throw error;
    db.connection.end();
    console.log(results);
  });
}

insertDataInfo();
