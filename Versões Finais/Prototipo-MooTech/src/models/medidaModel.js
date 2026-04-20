var database = require("../database/config");

function buscarTemperatura(idTanque) {

    var instrucaoSql = `SELECT  
        temperatura,
        historico_registro,
        DATE_FORMAT(historico_registro,'%H:%i:%s') as historico_grafico
        FROM leitura_sensor_temperatura_umidade
        JOIN sensor_temperatura_umidade ON fk_sensor_temperatura_umidade = id_sensor
        JOIN tanque ON fk_tanque = id_tanque
        WHERE id_tanque = ${idTanque}
        ORDER BY id_leitura DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTemperaturaEmTempoReal(idTanque) {

    var instrucaoSql = `SELECT  
        temperatura,
        historico_registro,
        DATE_FORMAT(historico_registro,'%H:%i:%s') as historico_grafico
        FROM leitura_sensor_temperatura_umidade
        JOIN sensor_temperatura_umidade ON fk_sensor_temperatura_umidade = id_sensor
        JOIN tanque ON fk_tanque = id_tanque
        WHERE id_tanque = ${idTanque}
        ORDER BY id_leitura DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUmidade(idTanque) {

    var instrucaoSql = `SELECT  
        umidade,
        historico_registro,
        DATE_FORMAT(historico_registro,'%H:%i:%s') as historico_grafico
        FROM leitura_sensor_temperatura_umidade
        JOIN sensor_temperatura_umidade ON fk_sensor_temperatura_umidade = id_sensor
        JOIN tanque ON fk_tanque = id_tanque
        WHERE id_tanque = ${idTanque}
        ORDER BY id_leitura DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUmidadeEmTempoReal(idTanque) {

    var instrucaoSql = `SELECT  
        umidade,
        historico_registro,
        DATE_FORMAT(historico_registro,'%H:%i:%s') as historico_grafico
        FROM leitura_sensor_temperatura_umidade
        JOIN sensor_temperatura_umidade ON fk_sensor_temperatura_umidade = id_sensor
        JOIN tanque ON fk_tanque = id_tanque
        WHERE id_tanque = ${idTanque}
        ORDER BY id_leitura DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarTemperatura,
    buscarUmidade,
    buscarTemperaturaEmTempoReal,
    buscarUmidadeEmTempoReal
}
