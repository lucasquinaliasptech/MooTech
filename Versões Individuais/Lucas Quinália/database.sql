create database mootech;

use mootech;

create table usuario (
	id int primary key auto_increment,
    nome_fantasia varchar(100),
    razao_social varchar(100) not null,
    cnpj char(14) not null,
    telefone char(11),
    email varchar(100) not null,
    senha varchar(100) not null,
    situacao tinyint check (situacao in (0,1)) not null default 1
);

create table estado (
	id int primary key auto_increment,
    sigla char(2) not null unique,
    nome varchar(50) not null unique,
    regiao varchar(15) not null,
    constraint chkRegiao check (regiao in ('Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'))
);

create table endereco (
	id int primary key auto_increment,
    id_usuario int not null,
    cep char(8) not null,
    logradouro varchar(100) not null,
    numero int,
    complemento varchar(100),
    id_estado int not null,
    municipio varchar(50) not null,
    constraint fkUsuarioEndereco foreign key (id_usuario) references usuario(id),
    constraint fkEstadoEndereco foreign key (id_estado) references estado(id)
);

create table armazenamento (
	id int primary key auto_increment,
    id_usuario int not null,
    capacidade decimal(10,2) not null,
    utilizacao tinyint check (utilizacao in (0,1)) not null,
    constraint fkUsuarioArmazenamento foreign key (id_usuario) references usuario(id)
);

create table sensor_temperatura_umidade (
	id int primary key auto_increment,
    id_armazenamento int not null,
    temperatura_max decimal(10,2) not null,
    temperatura_min decimal(10,2) not null,
    umidade_max decimal(10,2) not null,
    umidade_min decimal(10,2) not null,
    situacao tinyint check (situacao in (0, 1)) not null,
    constraint fkArmazenamentoSensor foreign key (id_armazenamento) references armazenamento(id)
);

create table registro (
	id int primary key auto_increment,
    id_sensor_temperatura_umidade int not null,
    temperatura decimal(10,2) not null,
    umidade decimal(10,2) not null,
    data_hora datetime default current_timestamp(),
    constraint fkSensorTemperaturaUmidadeRegistro foreign key (id_sensor_temperatura_umidade) references sensor_temperatura_umidade(id)
);

insert into usuario (nome_fantasia, razao_social, cnpj, telefone, email, senha, situacao) values
	()
;

insert into endereco (id_usuario, cep, logradouro, numero, complemento, estado, municipio) values
	()
;

insert into estado (sigla, nome, regiao) values
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

insert into armazenamento (id_usuario, capacidade, utilizacao) values
	()
;

insert into registro (id_sensor, temperatura, umidade, data_hora) values
	()
;

select * from usuario;
select * from estado;
select * from endereco;
select * from armazenamento;
select * from sensor_temperatura_umidade;
select * from registro;

select * from registro where date(data_hora) = current_date();
select * from registro where date(data_hora) between current_date() - 7 and current_date();

select *,
	case
		when (r.temperatura > s.temperatura_max and r.umidade > s.umidade_max) then 'TEMPERATURA E UMIDADE ACIMA DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade < s.umidade_min) then 'TEMPERATURA E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura > s.temperatura_max and r.umidade < s.umidade_min) then 'TEMPERATURA ACIMA DO IDEAL E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade > s.umidade_max) then 'TEMPERATURA ABAIXO DO IDEAL E UMIDADE ACIMA DO IDEAL'
		when r.temperatura > s.temperatura_max then 'TEMPERATURA ACIMA DO IDEAL'
        when r.temperatura < s.temperatura_min then 'TEMPERATURA ABAIXO DO IDEAL'
        when r.umidade > s.umidade_max then 'UMIDADE ACIMA DO IDEAL'
        when r.umidade < s.umidade_min then 'UMIDADE ABAIXO DO IDEAL'
        else 'Temperatura e umidade dentro do ideal'
	end as 'status_temperatura_umidade'
from registro r inner join sensor_temperatura_umidade s;

select *,
	case
		when (r.temperatura > s.temperatura_max and r.umidade > s.umidade_max) then 'TEMPERATURA E UMIDADE ACIMA DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade < s.umidade_min) then 'TEMPERATURA E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura > s.temperatura_max and r.umidade < s.umidade_min) then 'TEMPERATURA ACIMA DO IDEAL E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade > s.umidade_max) then 'TEMPERATURA ABAIXO DO IDEAL E UMIDADE ACIMA DO IDEAL'
		when r.temperatura > s.temperatura_max then 'TEMPERATURA ACIMA DO IDEAL'
        when r.temperatura < s.temperatura_min then 'TEMPERATURA ABAIXO DO IDEAL'
        when r.umidade > s.umidade_max then 'UMIDADE ACIMA DO IDEAL'
        when r.umidade < s.umidade_min then 'UMIDADE ABAIXO DO IDEAL'
        else 'Temperatura e umidade dentro do ideal'
	end as 'status_temperatura_umidade'
from registro r inner join sensor_temperatura_umidade s where date(r.data_hora) = current_date();

select *,
	case
		when (r.temperatura > s.temperatura_max and r.umidade > s.umidade_max) then 'TEMPERATURA E UMIDADE ACIMA DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade < s.umidade_min) then 'TEMPERATURA E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura > s.temperatura_max and r.umidade < s.umidade_min) then 'TEMPERATURA ACIMA DO IDEAL E UMIDADE ABAIXO DO IDEAL'
        when (r.temperatura < s.temperatura_min and r.umidade > s.umidade_max) then 'TEMPERATURA ABAIXO DO IDEAL E UMIDADE ACIMA DO IDEAL'
		when r.temperatura > s.temperatura_max then 'TEMPERATURA ACIMA DO IDEAL'
        when r.temperatura < s.temperatura_min then 'TEMPERATURA ABAIXO DO IDEAL'
        when r.umidade > s.umidade_max then 'UMIDADE ACIMA DO IDEAL'
        when r.umidade < s.umidade_min then 'UMIDADE ABAIXO DO IDEAL'
        else 'Temperatura e umidade dentro do ideal'
	end as 'status_temperatura_umidade'
from registro r inner join sensor_temperatura_umidade s where date(r.data_hora) between current_date() - 7 and current_date();

select * from armazenamento where capacidade > 2000;
select * from armazenamento where capacidade <= 2000;

select * from armazenamento where utilizacao = 1;
select * from armazenamento where utilizacao = 0;

select * from armazenamento where utilizacao = 0 and capacidade > 20000;