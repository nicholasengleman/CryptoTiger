const express = require("express");
const router = express.Router();

const updateCryptoData = require("../controllers/updateClientCryptoData");
const getDataObject = require("../controllers/getDataObject");

router.get("/updatedata", function(req, res) {
  updateCryptoData(function(result) {
    res.send(result);
  });
});


router.get("/getdataobject", function(req, res) {
  getDataObject(function(result) {
    res.send(result);
  })
});

module.exports = router;
