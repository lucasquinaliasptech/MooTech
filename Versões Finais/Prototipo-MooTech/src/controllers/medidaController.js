var medidaModel = require("../models/medidaModel");

function buscarMedidasTempoReal(req, res) {
    var idTanque = req.params.idTanque;
    var idGalpao = req.params.idGalpao;
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasTempoReal(idGalpao, idTanque, idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarEmTempoRealTodo(req, res) {
    var idGalpao = req.params.idGalpao;
    var idUsuario = req.params.idUsuario; 
    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarEmTempoRealTodo(idGalpao, idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarEmTempoRealTodo,
    buscarMedidasTempoReal
}