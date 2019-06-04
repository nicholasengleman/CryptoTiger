const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbSetup = require("./services/dbSetup");

//Express Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

//create tables in db
//dbSetup.createTables();

//insert Crypto List into CryptoList table
//dbSetup.insertCryptoList();

//insert Data Info into Data Info table
dbSetup.insertDataInfo();
