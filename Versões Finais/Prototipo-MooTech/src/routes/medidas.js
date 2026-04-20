var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTanque", function (req, res) {
    medidaController.buscarTemperatura(req, res);
});

router.get("/ultimas/:idTanque", function (req, res) {
    medidaController.buscarUmidade(req, res);
});

router.get("/tempo-real/:idTanque", function (req, res) {
    medidaController.buscarTemperaturaEmTempoReal(req, res);
})

router.get("/tempo-real/:idTanque", function (req, res) {
    medidaController.buscarUmidadeEmTempoReal(req, res);
})

module.exports = router;