const mysql = require("mysql");

let db = mysql.createConnection({
    host: "localhost",
    user: "cryptotiger",
    password: "G6wbEjtTCsA1IH9",
    database: "cryptotiger",
    multipleStatements: true,
    dateStrings: true
});

module.exports = db;
