const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "mydb.c29nwmoj38nu.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "engleman",
  database: "cryptotiger"
});

module.exports = { connection };
