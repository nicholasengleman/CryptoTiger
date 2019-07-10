const express = require("express");
const router = express.Router();

const getDefaultData = require("../controllers/getDefaultData");

router.get("/getDefaultData", function(req, res) {
  getDefaultData(function(result) {
    res.send(result);
  });
});


;

module.exports = router;
