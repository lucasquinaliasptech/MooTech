CREATE DATABASE mootech;
USE mootech;

CREATE TABLE empresa(
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
cnpj CHAR(14) NOT NULL,
cep CHAR (8) NOT NULL,
numero CHAR (5) NOT NULL);

CREATE TABLE usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email varchar(50) NOT NULL,
fk_empresa int,
CONSTRAINT fk_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE area(
id_area INT PRIMARY KEY AUTO_INCREMENT,
local VARCHAR(500),
fk_empresa_area INT,
CONSTRAINT fk_empresa_area FOREIGN KEY (fk_empresa_area) REFERENCES empresa(id_empresa));

CREATE TABLE tanque(
id_tanque INT PRIMARY KEY AUTO_INCREMENT,
fk_area int,
CONSTRAINT fk_area FOREIGN KEY (fk_area) REFERENCES area(id_area)
);

CREATE TABLE sensor(
id_sensor INT PRIMARY KEY AUTO_INCREMENT,
status VARCHAR(45) CHECK (status in
	("ATIVO", "INATIVO", "EM MANUTENÇÃO")),
fk_local INT,
CONSTRAINT fk_local FOREIGN KEY (fk_local) REFERENCES tanque(id_tanque)
); 

CREATE TABLE leitura_sensor(
id_leitura INT PRIMARY KEY AUTO_INCREMENT,
temperatura DECIMAL(5,2),
umidade DECIMAL (5,2),
data_hora DATETIME,
fk_sensor INT,
CONSTRAINT fk_sensor FOREIGN KEY (fk_sensor) REFERENCES sensor(id_sensor)
);

INSERT INTO empresa (nome, cnpj, cep, numero) VALUES
('Empresa 1', '11111111000101', '01001000', '100'),
('Empresa 2', '22222222000102', '02002000', '200'),
('Empresa 3', '33333333000103', '03003000', '300'),
('Empresa 4', '44444444000104', '04004000', '400'),
('Empresa 5', '55555555000105', '05005000', '500');

INSERT INTO usuario (nome, email, fk_empresa) VALUES
('Usuario 1', 'usuario1@email.com', 1),
('Usuario 2', 'usuario2@email.com', 2),
('Usuario 3', 'usuario3@email.com', 3),
('Usuario 4', 'usuario4@email.com', 4),
('Usuario 5', 'usuario5@email.com', 5);

INSERT INTO area (local, fk_empresa_area) VALUES
('Area 1', 1),
('Area 2', 2),
('Area 3', 3),
('Area 4', 4),
('Area 5', 5);

INSERT INTO tanque (fk_area) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO sensor (status, fk_local) VALUES
('ATIVO', 1),
('INATIVO', 2),
('EM MANUTENÇÃO', 3),
('ATIVO', 4),
('INATIVO', 5);

INSERT INTO leitura_sensor (temperatura, umidade, data_hora, fk_sensor) VALUES
(4.00, 80.00, '2026-03-28 10:00:00', 1),
(5.00, 78.00, '2026-03-28 11:00:00', 2),
(6.00, 75.00, '2026-03-28 12:00:00', 3),
(3.50, 82.00, '2026-03-28 13:00:00', 4),
(4.80, 79.00, '2026-03-28 14:00:00', 5);

-- Selects

SELECT * FROM empresa;

SELECT 
    u.id_usuario,
    u.nome AS usuario,
    u.email,
    e.nome AS empresa
FROM usuario u
JOIN empresa e ON u.fk_empresa = e.id_empresa;

SELECT 
    s.id_sensor as Sensores,
    s.status as STATUS_FUNCIONAMENTO,
    t.id_tanque as Tanques,
    a.local AS area,
    e.nome AS empresa
FROM sensor s
JOIN tanque t ON s.fk_local = t.id_tanque
JOIN area a ON t.fk_area = a.id_area
JOIN empresa e ON a.fk_empresa_area = e.id_empresa;


SELECT 
    l.id_leitura as Dados_Sensor,
    l.temperatura as Temperatura,
    l.umidade as Umidade,
    l.data_hora as Data_Hora,
    s.id_sensor as Sensores,
    t.id_tanque as Tanque,
    a.local AS Area,
    e.nome AS Empresa
FROM leitura_sensor l
JOIN sensor s ON l.fk_sensor = s.id_sensor
JOIN tanque t ON s.fk_local = t.id_tanque
JOIN area a ON t.fk_area = a.id_area
JOIN empresa e ON a.fk_empresa_area = e.id_empresa;

SELECT
    e.id_empresa,
    e.nome AS Empresa,
    e.cnpj,
    CONCAT(e.cep, ' - n° ', e.numero) AS Endereço,
    u.fk_empresa as Funcionario_Empresa,
    u.nome AS Usuario,
    u.email
FROM empresa e
JOIN usuario u ON u.fk_empresa = e.id_empresa;
    
SELECT id_sensor as Sensores, fk_local as Tanque, status as STATUS
       from sensor WHERE status = 'ATIVO';

SELECT id_sensor as Sensores, fk_local as Tanque, status as STATUS
       from sensor WHERE status = 'INATIVO';

SELECT id_sensor as Sensores, fk_local as Tanque, status as STATUS
       from sensor WHERE status = 'EM MANUTENÇÃO';
