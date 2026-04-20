var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // RECUPERAÇÃO CORRETA DOS VALORES
    var razaoSocial = req.body.razaoSocialServer; // Estava nome
    var nomeFantasia = req.body.nomeFantasiaServer; // Estava cnpjServer
    var cnpj = req.body.cnpjServer; // Estava nomeServer
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;

    // Validações
    if (razaoSocial == undefined) {
        res.status(400).send("Sua razão social está indefinida!");
    } else if (nomeFantasia == undefined) {
        res.status(400).send("Seu nome fantasia está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.cadastrar(razaoSocial, nomeFantasia, cnpj, email, telefone, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}
