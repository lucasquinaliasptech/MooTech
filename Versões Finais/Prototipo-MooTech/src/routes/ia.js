var express = require("express");
var router = express.Router();

var iaController = require("../controllers/iaController")

router.post("/perguntar", (req, res) => {
    iaController.perguntar(req, res);
})

module.exports = router;