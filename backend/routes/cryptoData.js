const express = require("express");
const router = express.Router();

const updateCryptoData = require("../controllers/updateCryptoData");

router.get("/", function(req, res) {
  updateCryptoData(function(result) {
    res.send(result);
  });
});

module.exports = router;
