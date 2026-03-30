create database MooTech;
use MooTech;

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(14) unique,
cep char(8),
numeroEndereco varchar(6));

insert into empresa (nomeFantasia, cnpj, cep, numeroEndereco) values
('Fazenda MooTech', '12345678000199', '06010000', '500'),
('Laticínios São Paulo', '98765432000188', '01310100', '1050');

-- ///////////////////////////////////////////////////////////////////////////////////////////

create table cliente(
idCliente int primary key auto_increment,
nomeCompleto varchar(60) not null,
email varchar(60) not null unique,
telefone char(11) not null unique,
data_cadastro datetime default current_timestamp,
situacao varchar(10) not null default 'Ativo',
fkEmpresa int,
constraint ck_cliente check(situacao in ('Ativo', 'Inativo')),
foreign key (fkEmpresa) references empresa(idEmpresa))
auto_increment = 100;

insert into cliente (nomeCompleto, email, telefone, fkEmpresa) values
('Lucas de Britto Cruz', 'lucas@mootech.com.br', '11988887777', 1),
('Augusto Lins Pereira', 'augusto@laticiniosp.com.br', '11977776666', 2);

-- ///////////////////////////////////////////////////////////////////////////////////////////

create table usuario (
id int primary key auto_increment,
nome varchar(60) not null,
email varchar(60) not null unique,
senha varchar(25) not null,
tipo varchar(10) not null,
fkCliente int not null,
fkEmpresa int not null,
constraint ck_usuario check(tipo in ('Admin','Técnico')),
foreign key (fkCliente) references cliente(idCliente),
foreign key (fkEmpresa) references empresa(idEmpresa))
auto_increment = 1000;

insert into usuario (nome, email, senha, tipo, fkCliente, fkEmpresa) values
('Lucas Britto', 'lucas@mootech.com', 'Moo#2026', 'Admin', 100, 1),
('Augusto Lins', 'augusto@laticiniosp.com', 'Tech@Lins123', 'Técnico', 101, 2);

-- ///////////////////////////////////////////////////////////////////////////////////////////

create table sensor (
id int primary key auto_increment,
num_serie varchar(60) not null unique,
local_instalacao varchar(60) not null,
data_instalacao datetime not null,
situacao varchar(10) not null default 'Ativo',
fkEmpresa int not null,
constraint ck_sensor check(situacao in ('Ativo', 'Inativo')),
foreign key (fkEmpresa) references empresa(idEmpresa));

create index ix_sensor on sensor(num_serie, local_instalacao);

insert into sensor (num_serie, local_instalacao, data_instalacao, fkEmpresa) values 
('MT-TEMP-001', 'Tanque de Resfriamento A1', '2026-03-01 10:00:00', 1),
('MT-TEMP-002', 'Tanque de Resfriamento A2', '2026-03-01 10:30:00', 1),
('LT-TEMP-050', 'Tanque de Resfriamento Ala 2', '2026-03-10 09:00:00', 2);

-- ///////////////////////////////////////////////////////////////////////////////////////////

create table leitorSensor (
id int primary key auto_increment,
temperatura int,
umidade int,
data_hora datetime default current_timestamp,
fkSensor int not null);

create index ix_leitor on leitorSensor(temperatura, umidade, data_hora);

insert into leitorSensor (temperatura, umidade, data_hora, fkSensor) values 
(3, 55, '2026-03-28 12:00:00', 1), -- Ideal: 3°C / 55%
(4, 58, '2026-03-28 13:00:00', 1), -- No Limite: 4°C / 58%
(5, 65, '2026-03-28 14:00:00', 1), -- ALERTA: 5°C / 65% (Risco de CBT)
(3, 54, '2026-03-28 15:00:00', 3); -- Indústria: 3°C / 54%

-- ///////////////////////////////////////////////////////////////////////////////////////////
-- Selects

-- Monitoramento Geral
select
    e.nomeFantasia Empresa,
    s.local_instalacao Local,
    s.num_serie 'Nº de Série',
    l.temperatura 'Temp (ºC)',
    l.umidade 'Umid (%)',
    date_format(l.data_hora, '%d/%m/%Y %H:%i') as 'Data/Hora'
from leitorSensor l
join sensor s on l.fkSensor = s.id
join empresa e on s.fkEmpresa = e.idEmpresa
order by l.data_hora desc;

-- Alertas Críticos
select 
    e.nomeFantasia Empresa,
    s.local_instalacao Setor,
    l.temperatura Temp_Alerta,
    l.umidade Umid_Alerta,
    l.data_hora
from leitorSensor l
join sensor s on l.fkSensor = s.id
join empresa e on s.fkEmpresa = e.idEmpresa
where l.temperatura > 4 or l.umidade > 60;

-- Gestão de Acessos
select 
    u.nome Usuario,
    u.tipo Cargo,
    c.nomeCompleto Responsavel_Conta,
    e.nomeFantasia Empresa_Vinculada
from usuario u
join cliente c on u.fkCliente = c.idCliente
join empresa e on u.fkEmpresa = e.idEmpresa;