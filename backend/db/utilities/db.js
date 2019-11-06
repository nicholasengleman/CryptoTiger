const mysql = require("mysql");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "engleman!",
  database: "cryptotiger",
  multipleStatements: true,
  dateStrings: true,
});



module.exports = db;
