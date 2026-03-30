create database MooTech;

USE MooTech;

create table usuário(
id_usuario int primary key,
nome varchar(50) not null,
email varchar(50) not null,
cnpj char(14) unique,
cpf char(11) unique,
constraint chk_cpf_cnpj
check(
    (cpf is not null and cnpj is null) or
    (cpf is null and cnpj is not null)
)
);



create table endereço(
id_endereco int primary key,
logradouro varchar (50) not null,
cep char(8),
número char (4),
fk_usuário INT,
constraint fk_endereco
foreign key (fk_usuário) references usuário(id_usuario)
);


create table galpão(
id_galpao int primary key,
fk_endereço int not null,
nome_galpao varchar(45) not null,
sigla CHAR(2),
constraint fkgalpao
foreign key (fk_endereço) references endereço(id_endereco) 
);


create table dados_do_sensor(
id_dado int primary key,
temperatura decimal (5,2),
umidade int,
historico date default (current_timestamp)
);


create table sensor(
id_sensor int primary key,
data_da_instalação date not null,
fk_galpao int,
fk_dado int,
status varchar(15) check (status in
("ativo", "inativo", "Em manutenção")),
constraint fksensor 
foreign key (fk_galpao) references galpão(id_galpao),
foreign key (fk_dado) references dados_do_sensor(id_dado)
);


create table tanque(
id_tanque int not null,
fk_galpao int not null,
fk_dado int not null,
primary key (id_tanque, fk_galpao),
constraint fktanque 
foreign key (fk_galpao) references galpão(id_galpao),
foreign key (fk_dado) references dados_do_sensor(id_dado)
);


insert into usuário (id_usuario, nome, email, cnpj, cpf) values
(1, 'Ana Silva', 'ana@gmail.com', null, '12345678901'),
(2, 'Carlos Souza', 'carlos@gmail.com', null, '98765432100'),
(3, 'AgroTech LTDA', 'contato@agrotech.com', '12345678000199', null);

insert into endereço (id_endereco, logradouro, cep, número, fk_usuário) values
(1, 'Rua das Flores', '01001000', '123', 1),
(2, 'Av Paulista', '01311000', '1000', 2),
(3, 'Rodovia BR-101', '02002000', '500', 3);

insert into galpão (id_galpao, fk_endereço, nome_galpao, sigla) values
(1, 1, 'Galpão Leite A', 'LA'),
(2, 2, 'Galpão Leite B', 'LB'),
(3, 3, 'Galpão Central', 'GC');


insert into dados_do_sensor (id_dado, temperatura, umidade, historico) values
(1, 4.0, 85, '2026-03-20'),
(2, 3.20, 78, '2026-03-21'),
(3, 3.80, 90, '2026-03-22'),
(4, 4.0, 70, '2026-03-23');


insert into sensor (id_sensor, data_da_instalação, fk_galpao, fk_dado, status) values
(1, '2025-01-10', 1, 1, 'ativo'),
(2, '2025-02-15', 2, 2, 'Em manutenção'),
(3, '2025-03-01', 3, 3, 'ativo');

insert into tanque (id_tanque, fk_galpao, fk_dado) values
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

select 
u.nome as usuario,
g.nome_galpao,
t.id_tanque,
d.temperatura,
d.umidade,
s.status
from usuário u
join endereço e on u.id_usuario = e.fk_usuário
join galpão g on e.id_endereco = g.fk_endereço
left join sensor s on g.id_galpao = s.fk_galpao
left join dados_do_sensor d on s.fk_dado = d.id_dado
left join tanque t on g.id_galpao = t.fk_galpao;






