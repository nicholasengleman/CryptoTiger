const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbSetup = require("./services/dbSetup");
const dbUpdate = require("./services/dbUpdate");
const clientUpdate = require("./services/clientUpdate");

//Express Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

//create tables in db
//dbSetup.createTables();

//insert Crypto List into CryptoList table
//dbSetup.insertCryptoList();

//insert Data Info into Data Info table
//dbSetup.insertDataInfo();

//insert Price Data
//dbUpdate.getUpdateCryptoNumberValues();

//insert String Data

//update client

app.get("/api/updatecryptos", cors(), (req, res, next) => {
  clientUpdate.updateCryptoData(function(result) {
    res.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
