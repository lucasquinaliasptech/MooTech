

CREATE DATABASE mootech;
USE mootech;

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
razao_social VARCHAR(50) NOT NULL,
nome_ficticio VARCHAR(50) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
email VARCHAR(60) NOT NULL,
telefone CHAR(11) NOT NULL,
senha VARCHAR(30) NOT NULL,
status TINYINT,
	CONSTRAINT chk_status_usuario
		CHECK(status in(0,1))
);

INSERT INTO usuario (razao_social, nome_ficticio, cnpj, email, telefone, senha, status) VALUES
('Mootech Tecnologias & Sensores Ltda', 'Mootech', '12345678000101', 'contato@boavida.com', '11987654321', '123456', 1),
('SPTech Ltda', 'SPTech', '98765432000102', 'sptech@email.com', '11912345678', 'abcdef', 1),
('Fazenda Leite Nobre LTDA', 'Leite Nobre', '11223344000103', 'leitenobre@email.com', '11999998888', 'senha123', 0);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE endereco(
id_endereco INT PRIMARY KEY AUTO_INCREMENT,
cep CHAR(8) NOT NULL,
logradouro VARCHAR(100),
numero INT NOT NULL,
complemento VARCHAR(100),
estado_sigla CHAR(2),
municipio VARCHAR(50) NOT NULL,
fk_usuario INT,
	CONSTRAINT fkUsuario
		FOREIGN KEY (fk_usuario)
		REFERENCES usuario(id_usuario)
);

INSERT INTO endereco (cep, logradouro, numero, complemento, estado_sigla, municipio, fk_usuario) VALUES
('01001000', 'Rua A', 100, 'Galpao 1', 'SP', 'São Paulo', 1),
('02002000', 'Rua B', 200, 'Galpao 2', 'SP', 'Campinas', 2),
('03003000', 'Rua C', 300, 'Galpao 3', 'MG', 'Belo Horizonte', 3);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE IF NOT EXISTS galpao(
id_galpao INT PRIMARY KEY,
fk_endereco INT NOT NULL,
nome_galpao VARCHAR(45) NOT NULL,
ala CHAR(2),
	CONSTRAINT fkEndereco
		FOREIGN KEY (fk_endereco)
		REFERENCES endereco(id_endereco) 
);

INSERT INTO galpao (id_galpao, fk_endereco, nome_galpao, ala) VALUES
(1, 1, 'Galpao Principal', 'A1'),
(2, 2, 'Galpao Secundario', 'B1'),
(3, 3, 'Galpao Reserva', 'C1');

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE tanque(
id_taque INT PRIMARY KEY AUTO_INCREMENT,
capacidade DECIMAL(10,2) NOT NULL,
fk_galpao INT,
	CONSTRAINT fkGalpao
		FOREIGN KEY (fk_galpao)
        REFERENCES galpao(id_galpao)
);

INSERT INTO tanque (capacidade, fk_galpao) VALUES
(1000.50, 1),
(2000.00, 2),
(1500.75, 3);

-- /////////////////////////////////////////////////////////////////////

CREATE TABLE sensor_temperatura_umidade(
id_sensor INT PRIMARY KEY AUTO_INCREMENT,
data_instalacao DATE NOT NULL,
fk_tanque INT,
status_sensor TINYINT,
	CONSTRAINT chk_status_sensor
		CHECK(status_sensor in(0,1,2)),
	CONSTRAINT fkTanque
		FOREIGN KEY (fk_tanque)
        REFERENCES tanque(id_tanque)
);



-- /////////////////////////////////////////////////////////////////////

CREATE TABLE leitura_sensor(
id_leitura INT PRIMARY KEY AUTO_INCREMENT,
 temperatura_max DECIMAL(10,2) NOT NULL,
    temperatura_min DECIMAL(10,2) NOT NULL,
umidade_max DECIMAL(10,2) NOT NULL,
    umidade_min DECIMAL(10,2) NOT NULL,
historico_registro DATE DEFAULT CURRENT_TIMESTAMP,
fk_sensor INT,
	CONSTRAINT fkSensor
		FOREIGN KEY (fk_sensor)
        REFERENCES sensor_temperatura_umidade(id_sensor)
);



-- /////////////////////////////////////////////////////////////////////

-- SELECTS

