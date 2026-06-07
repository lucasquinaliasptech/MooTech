var navbarModel = require("../models/navbarModel");

function buscarAtivo(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores ativos em tempo real`);

    navbarModel.buscarAtivo(idUsuario).then(function (resultado) {
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

function buscarAlerta(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando alertas em tempo real`);

    navbarModel.buscarAlerta(idUsuario).then(function (resultado) {
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

function buscarManutencao(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores em manutencao em tempo real`);

    navbarModel.buscarManutencao(idUsuario).then(function (resultado) {
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

function buscarTempAlta(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores em manutencao em tempo real`);

    navbarModel.buscarTempAlta(idUsuario).then(function (resultado) {
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

function buscarTempBaixa(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores em manutencao em tempo real`);

    navbarModel.buscarTempBaixa(idUsuario).then(function (resultado) {
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

function buscarUmiAlta(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores em manutencao em tempo real`);

    navbarModel.buscarUmiAlta(idUsuario).then(function (resultado) {
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

function buscarUmiBaixa(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log(`Recuperando sensores em manutencao em tempo real`);

    navbarModel.buscarUmiBaixa(idUsuario).then(function (resultado) {
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
    buscarAtivo,
    buscarAlerta,
    buscarManutencao,
    buscarTempAlta,
    buscarTempBaixa,
    buscarUmiAlta,
    buscarUmiBaixa
}