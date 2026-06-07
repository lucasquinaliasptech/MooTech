var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/tempo-real-todo/:idGalpao/:idUsuario", function (req, res) {
    medidaController.buscarEmTempoRealTodo(req, res);
});

router.get("/tempo-real/:idTanque/:idGalpao/:idUsuario", function (req, res) {
    medidaController.buscarMedidasTempoReal(req, res);
});

module.exports = router;