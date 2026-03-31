CREATE DATABASE IF NOT EXISTS mooTech;

USE mooTech;

CREATE TABLE IF NOT EXISTS usuario(
id_usuario INT PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
cnpj CHAR(11)
);

CREATE TABLE IF NOT EXISTS endereco(
id_endereco INT PRIMARY KEY,
logradouro VARCHAR(45) NOT NULL,
numero CHAR(4),
cep CHAR(8),
fk_usuario INT,
CONSTRAINT fk_endereco
FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS galpao(
id_galpao INT PRIMARY KEY,
fk_endereco INT NOT NULL,
nome_galpao VARCHAR(45) NOT NULL,
ala CHAR(2),
CONSTRAINT fkgalpao
FOREIGN KEY (fk_endereco) REFERENCES endereco(id_endereco) 
);


CREATE TABLE IF NOT EXISTS dado_sensor(
id_dado INT PRIMARY KEY,
temperaturaCelcius INT,
umidade INT,
historico DATE DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS sensor(
id_sensor INT PRIMARY KEY,
data_instalacao DATE NOT NULL,
funcionamento TINYINT,
fk_galpao INT,
fk_dado INT,
CONSTRAINT fksensor 
FOREIGN KEY (fk_galpao) REFERENCES galpao(id_galpao),
FOREIGN KEY (fk_dado) REFERENCES dado_sensor(id_dado)
);

CREATE TABLE IF NOT EXISTS tanque(
id_tanque INT NOT NULL,
fk_galpao INT NOT NULL,
fk_dado INT NOT NULL,
PRIMARY KEY (id_tanque, fk_galpao),
CONSTRAINT fktanque 
FOREIGN KEY (fk_galpao) REFERENCES galpao(id_galpao),
FOREIGN KEY (fk_dado) REFERENCES dado_sensor(id_dado)
);


INSERT INTO usuario (id_usuario, nome, email, cnpj) VALUES
(1, 'Carlos Silva', 'carlos@email.com', '12345678901'),
(2, 'Ana Souza', 'ana@email.com', '98765432100'),
(3, 'João Pereira', 'joao@email.com', '11122233344'),
(4, 'Maria Oliveira', 'maria@email.com', '55566677788'),
(5, 'AgroTech Ltda', 'contato@agrotech.com', '99988877766');


INSERT INTO endereco (id_endereco, logradouro, numero, cep, fk_usuario) VALUES
(1, 'Rua A', '101', '01001000', 1),
(2, 'Rua B', '202', '02002000', 2),
(3, 'Rua C', '303', '03003000', 3),
(4, 'Rua D', '404', '04004000', 4),
(5, 'Rua E', '505', '05005000', 5);

INSERT INTO galpao (id_galpao, fk_endereco, nome_galpao, ala) VALUES
(1, 1, 'Galpão Norte', 'A1'),
(2, 2, 'Galpão Sul', 'B1'),
(3, 3, 'Galpão Leste', 'C1'),
(4, 4, 'Galpão Oeste', 'D1'),
(5, 5, 'Galpão Central', 'E1');

INSERT INTO dado_sensor (id_dado, temperaturaCelcius, umidade, historico) VALUES
(1, 25, 60, '2026-03-20'),
(2, 28, 55, '2026-03-21'),
(3, 22, 70, '2026-03-22'),
(4, 30, 50, '2026-03-23'),
(5, 24, 65, '2026-03-24');

INSERT INTO sensor (id_sensor, data_instalacao, funcionamento, fk_galpao, fk_dado) VALUES
(1, '2026-01-10', 1, 1, 1),
(2, '2026-01-12', 1, 2, 2),
(3, '2026-01-15', 0, 3, 3),
(4, '2026-02-01', 1, 4, 4),
(5, '2026-02-10', 1, 5, 5);

INSERT INTO tanque (id_tanque, fk_galpao, fk_dado) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

UPDATE dado_sensor SET temperaturaCelcius = 1000, umidade = 1000 WHERE temperaturaCelcius = 22 AND umidade = 70; 

SELECT * FROM usuario;

SELECT 
    u.nome AS Usuario,
    g.nome_galpao AS Galpao,
    g.ala AS Ala,
    s.id_sensor AS Sensor,
    s.funcionamento AS Funcionando,
    d.temperaturaCelcius AS Temperatura,
    d.umidade AS Umidade,
    t.id_tanque AS Tanque,
    CASE 
		WHEN temperaturaCelcius = 1000 AND umidade = 1000 THEN ('Sensor com defeito')
	END AS Defeituoso
FROM usuario u JOIN endereco e ON u.id_usuario = e.fk_usuario
JOIN galpao g ON g.fk_endereco = e.id_endereco
LEFT JOIN sensor s ON s.fk_galpao = g.id_galpao
LEFT JOIN dado_sensor d ON s.fk_dado = d.id_dado
LEFT JOIN tanque t ON t.fk_galpao = g.id_galpao;