const express = require("express");
const router = express.Router();

const getDefaultData = require("../controllers/getDefaultData");
router.get("/getDefaultData", function(req, res) {
    getDefaultData(function(result) {
        res.send(result);
    });
});

const getColumnData = require("../controllers/getColumnData");
router.get("/getColumnData/:time", function(req, res) {
    getColumnData(req.params.time, function(err, result) {
        if (err) console.log(err);
        res.send(result);
    });
});

module.exports = router;
