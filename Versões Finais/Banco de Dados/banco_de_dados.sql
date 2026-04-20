
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

INSERT INTO usuario (razao_social, nome_fantasia, cnpj, email, telefone, senha, status_usuario) VALUES 
('Laticinios do Vale LTDA', 'Vale do Leite', '12345678000199', 'contato@valedoleite.com', '11988887777', 'senha123', 1),
('Agropecuaria Santa Maria LTDA', 'Fazenda Santa Maria', '98765432000188', 'contato@santamaria.com.br', '31977776666', 'leitepuroMG', 1),
('Cooperativa Regional Sul Leite', 'Sul Leite', '11222333000100', 'logistica@sulleite.coop', '51966665555', 'sul12345', 1);

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

INSERT INTO endereco (cep, logradouro, numero, complemento, municipio, fk_estado, fk_usuario) VALUES
('01234000', 'Rodovia das Vacas', 500, 'KM 12', 'São José dos Campos', 25, 1),
('35000000', 'Estrada Real', 1500, NULL, 'Uberaba', 13, 2),
('95000000', 'Av. das Cooperativas', 10, 'Hangar 4', 'Passo Fundo', 21, 3);

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

INSERT INTO galpao (id_galpao, fk_endereco, nome_galpao, ala) VALUES 
(1, 1, 'Galpão de Resfriamento A', 'A1'),
(2, 1, 'Galpão de Processamento B', 'B2'),
(3, 2, 'Unidade de Resfriamento Norte', 'N1'),
(4, 2, 'Setor de Coleta Primária', 'C1'),
(5, 3, 'Pavilhão de Estocagem Sul', 'S1');

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE tanque(
id_tanque INT PRIMARY KEY AUTO_INCREMENT,
capacidade DECIMAL(10,2) NOT NULL,
fk_galpao INT NOT NULL,
	CONSTRAINT fkGalpao
		FOREIGN KEY (fk_galpao)
        REFERENCES galpao(id_galpao)
);

INSERT INTO tanque (capacidade, fk_galpao) VALUES 
(5000.00, 1),
(10000.00, 1),
(15000.00, 3),
(15000.00, 3),
(8000.00, 4),
(20000.00, 5),
(30000.00, 5);

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

INSERT INTO sensor_temperatura_umidade (data_instalacao, temperatura_max, temperatura_min, umidade_max, umidade_min, status_sensor, fk_tanque) VALUES
('2026-01-15', 4.00, 0.00, 100.00, 75.00, 1, 1), 
('2026-01-20', 4.00, 0.00, 100.00, 75.00, 1, 2), 
('2026-05-10', 4.00, 0.00, 100.00, 75.00, 1, 3), 
('2026-05-10', 4.00, 0.00, 100.00, 75.00, 1, 4), 
('2026-08-20', 4.00, 0.00, 100.00, 75.00, 2, 6), -- (Em manutenção)
('2026-08-20', 4.00, 0.00, 100.00, 75.00, 1, 7);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE leitura_sensor_temperatura_umidade(
id_leitura INT PRIMARY KEY AUTO_INCREMENT,
historico_registro DATETIME DEFAULT CURRENT_TIMESTAMP(),
temperatura DECIMAL(10,2) NOT NULL,
umidade DECIMAL(10,2) NOT NULL,
fk_sensor_temperatura_umidade INT NOT NULL,
	CONSTRAINT fkSensor
		FOREIGN KEY (fk_sensor_temperatura_umidade)
        REFERENCES sensor_temperatura_umidade(id_sensor)
);

INSERT INTO leitura_sensor_temperatura_umidade (temperatura, umidade, fk_sensor_temperatura_umidade) VALUES 
(3.5, 55.2, 1), -- Normal
(4.2, 58.1, 1), -- Alerta (> 4.0)
(3.8, 48.5, 3), -- Normal
(4.5, 50.0, 4), -- Alerta (> 4.0)
(2.1, 30.0, 6); -- Normal

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
       u.nome_fantasia AS Nome
FROM endereco e
JOIN usuario u ON e.fk_usuario = u.id_usuario;

-- Galpões com endereço e seus respectivos usuários
SELECT 
    g.nome_galpao AS Galpão,
    g.ala AS Alas,
	CONCAT("CEP: ", e.cep, ", N°", e.numero) AS Endereco,
    CONCAT(e.municipio," - ", es.sigla) AS Municipio,
    u.nome_fantasia AS Nome,
    u.razao_social AS "Razão Social"
FROM galpao g
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
JOIN estado es ON e.fk_estado = es.id_estado;

-- Informações completas (Leitura, sensor, usuario e endereco)
SELECT
-- Leitura 
    l.temperatura "Temperatura Atual",
    l.umidade "Umidade Atual",
    l.historico_registro "Último Registro",
        CASE
		WHEN s.status_sensor = 1 THEN "Ativo"
        ELSE "Inativo"
	END AS "Status do Sensor",
-- Usuário
    u.nome_fantasia AS Nome,
    u.razao_social AS "Razão Social",
-- Endereço    
	CONCAT("CEP: ", e.cep, ", N°", e.numero) AS "Endereço",
    CONCAT(e.municipio," - ", es.sigla) AS Estado
    
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque
JOIN galpao g ON t.fk_galpao = g.id_galpao
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
JOIN estado es ON e.fk_estado = es.id_estado;
    
    -- Para não ficar muito poluido, tem como tirar o endereço

-- Sensores e seus tanques
SELECT
	s.id_sensor AS "ID do Sensor",
	CASE
		WHEN s.status_sensor = 1 THEN "Ativo"
        ELSE "Inativo"
	END AS "Status do Sensor",
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
    l.temperatura,
    l.historico_registro,

    s.id_sensor AS Sensores,
    t.id_tanque AS Tanques,
    g.nome_galpao AS Galpao,

    CASE 
        WHEN l.temperatura > 4 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS status_temperatura

FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s 
    ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t 
    ON s.fk_tanque = t.id_tanque
JOIN galpao g 
    ON t.fk_galpao = g.id_galpao;
    
-- Umidade alarmante
SELECT
    l.umidade,
    l.historico_registro,

    s.id_sensor AS Sensores,
    t.id_tanque AS Tanques,
    g.nome_galpao AS Galpao,

    CASE 
        WHEN l.umidade > 100 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS status_umidade

FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s 
    ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t 
    ON s.fk_tanque = t.id_tanque
JOIN galpao g 
    ON t.fk_galpao = g.id_galpao;