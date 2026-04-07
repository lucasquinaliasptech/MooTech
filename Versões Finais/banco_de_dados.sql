
CREATE DATABASE mootech;
USE mootech;

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
razao_social VARCHAR(50) NOT NULL,
nome_fantasia VARCHAR(50) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
email VARCHAR(60) NOT NULL UNIQUE,
telefone CHAR(11),
senha VARCHAR(30) NOT NULL,
status_usuario TINYINT(1),
	CONSTRAINT chk_status_usuario
		CHECK(status_usuario in(0,1))
);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE estado(
id_estado INT PRIMARY KEY AUTO_INCREMENT,
sigla CHAR(2) NOT NULL UNIQUE,
nome VARCHAR(50) NOT NULL UNIQUE,
regiao VARCHAR(15) NOT NULL,
    CONSTRAINT chk_regiao_status
        CHECK(regiao in ('Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'))
);

INSERT INTO estado (sigla, nome, regiao) VALUES
	('AC', 'Acre', 'Norte'),
	('AL', 'Alagoas', 'Nordeste'),
	('AP', 'Amapá', 'Norte'),
	('AM', 'Amazonas', 'Norte'),
	('BA', 'Bahia', 'Nordeste'),
	('CE', 'Ceará', 'Nordeste'),
	('DF', 'Distrito Federal', 'Centro-Oeste'),
	('ES', 'Espírito Santo', 'Sudeste'),
	('GO', 'Goiás', 'Centro-Oeste'),
	('MA', 'Maranhão', 'Nordeste'),
	('MT', 'Mato Grosso', 'Centro-Oeste'),
	('MS', 'Mato Grosso do Sul', 'Centro-Oeste'),
	('MG', 'Minas Gerais', 'Sudeste'),
	('PA', 'Pará', 'Norte'),
	('PB', 'Paraíba', 'Nordeste'),
	('PR', 'Paraná', 'Sul'),
	('PE', 'Pernambuco', 'Nordeste'),
	('PI', 'Piauí', 'Nordeste'),
	('RJ', 'Rio de Janeiro', 'Sudeste'),
	('RN', 'Rio Grande do Norte', 'Nordeste'),
	('RS', 'Rio Grande do Sul', 'Sul'),
	('RO', 'Rondônia', 'Norte'),
	('RR', 'Roraima', 'Norte'),
	('SC', 'Santa Catarina', 'Sul'),
	('SP', 'São Paulo', 'Sudeste'),
	('SE', 'Sergipe', 'Nordeste'),
	('TO', 'Tocantins', 'Norte')
;

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE endereco(
id_endereco INT PRIMARY KEY AUTO_INCREMENT,
cep CHAR(8) NOT NULL,
logradouro VARCHAR(100) NOT NULL,
numero INT,
complemento VARCHAR(100),
municipio VARCHAR(50) NOT NULL,
fk_estado INT NOT NULL,
fk_usuario INT NOT NULL,
	CONSTRAINT fkUsuario
		FOREIGN KEY (fk_usuario)
		REFERENCES usuario(id_usuario),
    CONSTRAINT fkEstado
        FOREIGN KEY (fk_estado)
        REFERENCES estado(id_estado)
);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE galpao(
id_galpao INT PRIMARY KEY,
fk_endereco INT NOT NULL,
nome_galpao VARCHAR(50) NOT NULL,
ala CHAR(2),
	CONSTRAINT fkEndereco
		FOREIGN KEY (fk_endereco)
		REFERENCES endereco(id_endereco) 
);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE tanque(
id_tanque INT PRIMARY KEY AUTO_INCREMENT,
capacidade DECIMAL(10,2) NOT NULL,
fk_galpao INT NOT NULL,
	CONSTRAINT fkGalpao
		FOREIGN KEY (fk_galpao)
        REFERENCES galpao(id_galpao)
);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE sensor_temperatura_umidade(
id_sensor INT PRIMARY KEY AUTO_INCREMENT,
data_instalacao DATE NOT NULL,
temperatura_max DECIMAL(10,2) NOT NULL,
temperatura_min DECIMAL(10,2) NOT NULL,
umidade_max DECIMAL(10,2) NOT NULL,
umidade_min DECIMAL(10,2) NOT NULL,
status_sensor TINYINT(1),
fk_tanque INT NOT NULL,
	CONSTRAINT chk_status_sensor
		CHECK(status_sensor in(0,1,2)),
	CONSTRAINT fkTanque
		FOREIGN KEY (fk_tanque)
        REFERENCES tanque(id_tanque)
);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE leitura_sensor_temperatura_umidade(
id_leitura INT PRIMARY KEY AUTO_INCREMENT,
historico_registro DATETIME DEFAULT CURRENT_TIMESTAMP(),
temperatura DECIMAL(10,2) NOT NULL,
umidade DECIMAL(10,2) NOT NULL,
fk_sensor_temperatura_umidade INT NOT NULL,
	CONSTRAINT fkSensor
		FOREIGN KEY (fk_sensor)
        REFERENCES sensor_temperatura_umidade(id_sensor)
);

-- /////////////////////////////////////////////////////////////////////

-- SELECTS

-- Ver usuários e suas informações
SELECT * FROM usuario;

-- Usuários ativos
SELECT * FROM usuario
WHERE status_usuario = 1;

-- Sensores inativos
SELECT * FROM sensor_temperatura_umidade
WHERE status_sensor = 0;

-- Sensores ativos
SELECT * FROM sensor_temperatura_umidade
WHERE status_sensor = 1;

-- Sensores em manutenção
SELECT * FROM sensor_temperatura_umidade
WHERE status_sensor = 2;

-- Endereços das empresas
SELECT e.id_endereco,
	   concat("CEP: ", cep, ", N°", numero) AS Endereco,
       u.razao_social AS Razao_Social,
       u.nome_ficticio AS Nome
FROM endereco e
JOIN usuario u ON e.fk_usuario = u.id_usuario;

-- Galpões com endereço e seus respectivos usuários
SELECT 
    g.nome_galpao AS Galpão,
    g.ala AS Alas,
	CONCAT("CEP: ", e.cep, ", N°", e.numero) AS Endereco,
    CONCAT(e.municipio," - ", e.estado_sigla) AS Municipio_Estado,
    u.nome_ficticio AS Nome,
    u.razao_social AS Razao_Social
FROM galpao g
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario;

-- Informações completas (Leitura, sensor, usuario e endereco)
SELECT
-- Sensor
    s.id_sensor AS Sensores,
    s.status_sensor AS STATUS,
-- Leitura 
    l.id_leitura,
    l.temperatura_max,
    l.temperatura_min,
    l.umidade_max,
    l.umidade_min,
    l.historico_registro,
-- Usuário
    u.nome_ficticio AS Nome,
    u.razao_social AS Razao_Social,
-- Endereço    
	CONCAT("CEP: ", e.cep, ", N°", e.numero) AS Endereco,
    CONCAT(e.municipio," - ", e.estado_sigla) AS Municipio_Estado
    
FROM leitura_sensor l
JOIN sensor_temperatura_umidade s 
    ON l.fk_sensor = s.id_sensor
JOIN endereco e 
    ON g.fk_endereco = e.id_endereco
JOIN usuario u 
    ON e.fk_usuario = u.id_usuario;
    
    -- Para não ficar muito poluido, tem como tirar o endereço

-- Sensores e seus tanques
SELECT s.id_sensor AS Sensores,
       s.status_sensor AS Status,
       t.id_tanque AS Tanques,
       CONCAT(g.id_galpao,", Ala ", g.ala) AS Localização_Tanque
FROM sensor_temperatura_umidade s
JOIN tanque t
	ON s.fk_tanque = t.id_tanque
JOIN galpao g
	ON g.id_galpao = t.fk_galpao;

-- Temperatura alarmante
SELECT 
    l.id_leitura AS Leitura,
    l.temperatura_max,
    l.temperatura_min,
    l.historico_registro,

    s.id_sensor AS Sensores,
    t.id_taque AS Tanques,
    g.nome_galpao AS Galpao,

    CASE 
        WHEN l.temperatura_max > 4 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS status_temperatura

FROM leitura_sensor l
JOIN sensor_temperatura_umidade s 
    ON l.fk_sensor = s.id_sensor
JOIN tanque t 
    ON s.fk_tanque = t.id_taque
JOIN galpao g 
    ON t.fk_galpao = g.id_galpao;
    
-- Umidade alarmante
SELECT 
    l.id_leitura AS Leitura,
    l.umidade_max,
    l.umidade_min,
    l.historico_registro,

    s.id_sensor AS Sensores,
    t.id_taque AS Tanques,
    g.nome_galpao AS Galpao,

    CASE 
        WHEN l.umidade_max > 100 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS status_umidade

FROM leitura_sensor l
JOIN sensor_temperatura_umidade s 
    ON l.fk_sensor = s.id_sensor
JOIN tanque t 
    ON s.fk_tanque = t.id_taque
JOIN galpao g 
    ON t.fk_galpao = g.id_galpao;
