const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Express Setup
const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Routers
// const updateCryptoData = require("./routes/cryptoData");
// app.use("/api/updatedata", updateCryptoData);


const updateDBNumberTable = require("./db/update/updateDBNumberTable");
const insertDBNumberTable = require("./db/migrate/insertDBNumberTable");

//insertDBNumberTable();
updateDBNumberTable("minute");















const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
