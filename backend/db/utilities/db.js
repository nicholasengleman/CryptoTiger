const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "ls-d2aa83b5cdb1edadcdb2601062dfa1b7182371f1.cb0z3ltmotsb.us-east-2.rds.amazonaws.com",
  user: "cryptotigeradmin",
  password: "-~s1UK~X:=yAr-b!_.[6ijo$YTvy>|}H",
  database: "cryptotiger",
  multipleStatements: true,
  dateStrings: true,
});



module.exports = connection;
