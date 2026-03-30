create database mootech;

use mootech;

create table cadastro (
cli_id int primary key,
nome varchar(100),
cpf_cnpj char(15) unique,
email varchar(150) unique,
senha char(150) not null,
data_cad  datetime default current_timestamp
);

create table endereco (
end_id int primary key,
logadouro varchar(150) not null,
numero char(10) not null,
complemento varchar(300),
cep varchar(10),
fk_cli int,
foreign key (fk_cli) references cadastro(id)
);

CREATE TABLE reservatorio (
    res_id int primary key,
    nome varchar(100),
    capacidade_litros decimal(10,2),
    temperatura_min decimal(5,2),
    temperatura_max decimal(5,2),
    fk_cliente int,
    foreign key (fk_cliente) references cliente(cli_id)
);

create table sensor (
    sensor_id int primary key,
    tipo ENUM('temperatura', 'umidade') not null,
    modelo varchar(50),
    status ENUM('ativo', 'inativo', 'manutencao') default 'ativo',
    fk_reservatorio int,
    foreign key (fk_reservatorio) references reservatorio(res_id)
);

create table leitura (
    leitura_id int primary key,
    valor decimal(10,2) not null,
    data_hora datetime default current_timestamp,
    fk_sensor int,
    foreign key (fk_sensor) references sensor(sensor_id)
);



