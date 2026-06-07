-- Select da temperatura atual:
CREATE VIEW vw_temperatura_atual
AS
SELECT l.temperatura AS temperatura, s.fk_tanque, t.fk_galpao, u.id_usuario, l.historico_registro
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario;

select * from vw_temperatura_atual
WHERE fk_tanque = 1 AND fk_galpao = 1 AND id_usuario = 1
ORDER BY l.historico_registro DESC
LIMIT 1;

-- colocar no codigo algo que substitua o 1 pelo valor escolhido

-- Select da umidade atual:
CREATE VIEW vw_umidade_atual
AS
SELECT l.umidade AS umidade, s.fk_tanque, t.fk_galpao, u.id_usuario, l.historico_registro
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario;

select * from vw_umidade_atual
WHERE fk_tanque = 1 AND fk_galpao = 1 AND id_usuario = 1
ORDER BY historico_registro DESC 
LIMIT 1;

select * from vw_umidade_atual;
drop view vw_umidade_atual;

-- Select da temperatura mais baixa:
CREATE VIEW vw_temperatura_baixa
AS
SELECT ROUND(MIN(l.temperatura),1) as temperatura, s.fk_tanque as tanque, t.fk_galpao, u.id_usuario
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
GROUP BY fk_tanque;


SELECT * FROM vw_temperatura_baixa
WHERE id_usuario = 1
LIMIT 1;

-- temperatura maxima
CREATE VIEW vw_temperatura_maxima
AS
SELECT ROUND(MAX(l.temperatura),1) as temperatura, s.fk_tanque as tanque, t.fk_galpao, u.id_usuario
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
GROUP BY fk_tanque;

SELECT * FROM vw_temperatura_maxima
WHERE id_usuario = 1
LIMIT 1;

-- Select a umidade mais baixa:
CREATE VIEW vw_umidade_baixa
AS
SELECT ROUND(MIN(l.umidade),0) as umidade, s.fk_tanque as tanque, t.fk_galpao, u.id_usuario
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
GROUP BY s.fk_tanque;

select * from vw_umidade_baixa
WHERE id_usuario = 1
LIMIT 1;


-- umidade maxima
CREATE VIEW vw_umidade_maxima
AS
SELECT ROUND(MAX(l.umidade),0) as umidade, s.fk_tanque as tanque, t.fk_galpao, u.id_usuario
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario
GROUP BY s.fk_tanque;

select * from vw_umidade_maxima
WHERE id_usuario = 1
LIMIT 1;

-- Histórico de temperatura:
CREATE VIEW vw_temperatura_historico
AS
SELECT l.temperatura AS temperatura, s.fk_tanque, t.fk_galpao, u.id_usuario, l.historico_registro
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario;

drop view vw_temperatura_historico;

SELECT * FROM vw_temperatura_historico
WHERE fk_tanque = 1 AND fk_galpao = 1 AND id_usuario = 1
ORDER BY historico_registro DESC 
LIMIT 10;

-- Histórico de umidade:
CREATE VIEW vw_umidade_historico
AS
SELECT l.umidade AS umidade, s.fk_tanque, t.fk_galpao, u.id_usuario, l.historico_registro
FROM leitura_sensor_temperatura_umidade l
JOIN sensor_temperatura_umidade s ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t ON s.fk_tanque = t.id_tanque 
JOIN galpao g ON t.fk_galpao = g.id_galpao 
JOIN endereco e ON g.fk_endereco = e.id_endereco
JOIN usuario u ON e.fk_usuario = u.id_usuario;

drop view vw_umidade_historico;

SELECT * FROM vw_umidade_historico
WHERE fk_tanque = 1 AND fk_galpao = 1 AND id_usuario = 1
ORDER BY historico_registro DESC 
LIMIT 10;

-- para pegar todos registros atuais
CREATE VIEW todos AS
SELECT id_sensor, id_tanque, id_galpao, id_usuario,
	   ROUND(l.temperatura,1) t,
       ROUND(l.umidade,0) u,
       l.historico_registro,
       DATE_FORMAT(l.historico_registro,'%H:%i') AS h
FROM leitura_sensor_temperatura_umidade l
JOIN (SELECT fk_sensor_temperatura_umidade,
	MAX(historico_registro) AS ultima_data
	FROM leitura_sensor_temperatura_umidade
    GROUP BY fk_sensor_temperatura_umidade) ult
ON l.fk_sensor_temperatura_umidade = ult.fk_sensor_temperatura_umidade
AND l.historico_registro = ult.ultima_data
JOIN sensor_temperatura_umidade s
ON l.fk_sensor_temperatura_umidade = s.id_sensor
JOIN tanque t
ON s.fk_tanque = t.id_tanque
JOIN galpao g
ON t.fk_galpao = g.id_galpao
JOIN endereco e
ON g.fk_endereco = e.id_endereco
JOIN usuario u
ON e.fk_usuario = u.id_usuario;

SELECT * FROM todos WHERE id_galpao = 1 AND id_usuario = 1;