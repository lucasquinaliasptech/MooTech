var express = require("express");
var router = express.Router();

var navbarController = require("../controllers/navbarController");

router.get("/ativo/:idUsuario", function (req, res) {
    navbarController.buscarAtivo(req, res);
})

router.get("/alerta/:idUsuario", function (req, res) {
    navbarController.buscarAlerta(req, res);
});

router.get("/manutencao/:idUsuario", function (req, res) {
    navbarController.buscarManutencao(req, res);
})

router.get("/tempAlta/:idUsuario", function (req, res) {
    navbarController.buscarTempAlta(req, res);
})

router.get("/tempBaixa/:idUsuario", function (req, res) {
    navbarController.buscarTempBaixa(req, res);
})

router.get("/umiAlta/:idUsuario", function (req, res) {
    navbarController.buscarUmiAlta(req, res);
})

router.get("/umiBaixa/:idUsuario", function (req, res) {
    navbarController.buscarUmiBaixa(req, res);
})

module.exports = router;