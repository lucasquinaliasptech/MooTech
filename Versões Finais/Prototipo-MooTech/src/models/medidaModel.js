var database = require("../database/config");

function buscarEmTempoRealTodo(idGalpao, idUsuario) {
    var instrucaoSql = `SELECT * FROM todos WHERE id_galpao = ${idGalpao} AND id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasTempoReal(idGalpao, idTanque, idUsuario){
    var instrucaoSql = `
        SELECT  ROUND(temperatura,1) as t,
        ROUND(umidade, 0) as u,
        historico_registro,
        DATE_FORMAT(historico_registro,'%H:%i') as h
        FROM leitura_sensor_temperatura_umidade
            JOIN sensor_temperatura_umidade
        ON fk_sensor_temperatura_umidade = id_sensor
            JOIN tanque
        ON fk_tanque = id_tanque
            JOIN galpao
        ON fk_galpao = id_galpao
            JOIN endereco
        ON fk_endereco = id_endereco
            JOIN usuario
        ON fk_usuario = id_usuario
        WHERE fk_galpao = ${idGalpao} AND fk_tanque = ${idTanque} AND id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarEmTempoRealTodo,
    buscarMedidasTempoReal
}
