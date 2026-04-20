var medidaModel = require("../models/medidaModel");

function buscarTemperatura(req, res) {

    const limite_linhas = 10;

    var idTanque = req.params.idTanque;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarTemperatura(idTanque, limite_linhas).then(function (resultado) {
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

function buscarUmidade(req, res) {

    const limite_linhas = 10;

    var idTanque = req.params.idTanque;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUmidade(idTanque, limite_linhas).then(function (resultado) {
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


function buscarTemperaturaEmTempoReal(req, res) {

    var idTanque = req.params.idTanque;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idTanque).then(function (resultado) {
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

function buscarUmidadeEmTempoReal(req, res) {

    var idTanque = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUmidadeEmTempoReal(idTanque).then(function (resultado) {
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
    buscarTemperatura,
    buscarUmidade,
    buscarTemperaturaEmTempoReal,
    buscarUmidadeEmTempoReal

}