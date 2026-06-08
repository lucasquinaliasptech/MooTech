var database = require("../database/config");

function buscarAtivo(idUsuario) {

    var instrucaoSql = `
        SELECT COUNT(s.id_sensor) as Ativos
            FROM sensor_temperatura_umidade s
            JOIN tanque 
        ON fk_tanque = id_tanque
            JOIN galpao 
        ON fk_galpao = id_galpao
            JOIN endereco 
        ON fk_endereco = id_endereco
            JOIN usuario 
        ON fk_usuario = id_usuario
        WHERE s.status_sensor = 1 AND id_usuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function buscarAlerta(idUsuario) {

    var instrucaoSql = `
        SELECT COUNT(DISTINCT s.id_sensor) as Alertas
            FROM leitura_sensor_temperatura_umidade l
            JOIN sensor_temperatura_umidade s 
        ON l.fk_sensor_temperatura_umidade = s.id_sensor
            JOIN tanque t 
        ON s.fk_tanque = t.id_tanque
            JOIN galpao g 
        ON t.fk_galpao = g.id_galpao
            JOIN endereco e
        ON g.fk_endereco = e.id_endereco
            JOIN usuario u 
        ON e.fk_usuario = u.id_usuario
        WHERE (l.temperatura > 4 OR l.temperatura < 0 OR l.umidade < 75) AND id_usuario = ${idUsuario} AND DATE(l.historico_registro) = CURDATE();
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarManutencao(idUsuario) {

    var instrucaoSql = `
        SELECT COUNT(s.id_sensor) as Manutencoes
            FROM sensor_temperatura_umidade s
            JOIN tanque 
        ON fk_tanque = id_tanque
            JOIN galpao 
        ON fk_galpao = id_galpao
            JOIN endereco 
        ON fk_endereco = id_endereco
            JOIN usuario 
        ON fk_usuario = id_usuario
        WHERE s.status_sensor = 2 AND id_usuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTempAlta(idUsuario) {
        var instrucaoSql = `
            SELECT * FROM todos 
            WHERE id_usuario = ${idUsuario} 
            ORDER BY historico_registro DESC, t DESC 
            LIMIT 1;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTempBaixa(idUsuario){
    var instrucaoSql = `
            SELECT * FROM todos 
            WHERE id_usuario = ${idUsuario} 
            ORDER BY historico_registro DESC, t ASC 
            LIMIT 1;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUmiAlta(idUsuario){
    var instrucaoSql = `
            SELECT * FROM todos 
            WHERE id_usuario = ${idUsuario} 
            ORDER BY historico_registro DESC, u DESC 
            LIMIT 1;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUmiBaixa(idUsuario) {
    var instrucaoSql = `
            SELECT * FROM todos 
            WHERE id_usuario = ${idUsuario} 
            ORDER BY historico_registro DESC, u ASC 
            LIMIT 1;
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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