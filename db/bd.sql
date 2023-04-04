CREATE DATABASE ecommerce_dl;

\c ecommerce_dl;


CREATE TABLE customers
(id SERIAL PRIMARY KEY,
name VARCHAR(30),
phone integer,
email VARCHAR UNIQUE,
password TEXT);

CREATE TABLE products
(id SERIAL PRIMARY KEY,
name VARCHAR(30),
sku VARCHAR(10),
price INT,
stock INT,
imageurl TEXT,
category VARCHAR(30),
description TEXT);

CREATE TABLE shopping_cart
(id SERIAL PRIMARY KEY,
id_customer INT,
id_product INT,
amount INT,
FOREIGN KEY (id_customer) REFERENCES customers (id),
FOREIGN KEY (id_product) REFERENCES products (id) );

------------------------------------------------------------
Las siguientes tablas quedaran para una versión 2.0
CREATE TABLE comments
(id SERIAL PRIMARY KEY,
id_customer INT,
id_product INT,
comment TEXT,
date DATE,
FOREIGN KEY (id_customer) REFERENCES customers (id),
FOREIGN KEY (id_product) REFERENCES products (id) );

CREATE TABLE customer_favorites
(id SERIAL PRIMARY KEY, id_customer INT,
id_product INT,
FOREIGN KEY (id_customer) REFERENCES customers (id),
FOREIGN KEY (id_product) REFERENCES products (id) );


CREATE TABLE orders
(id SERIAL PRIMARY KEY,
id_customer INT,
id_product INT,
FOREIGN KEY (id_customer) REFERENCES customers (id),
FOREIGN KEY (id_product) REFERENCES products (id),
num_order SERIAL,
date DATE,
subtotal INT,
amount INT,
total INT );

\dt;
Listar las tablas creadas

INSERT INTO customers (name, phone, email, password) VALUES
('seba1',559879568,'sebthomson1@gmail.com', 'aaa123');
('seba2',659879568,'sebthomson2@gmail.com', 'aaa124');
('seba3',759879568,'sebthomson3@gmail.com', 'aaa125');
('seba4',859879568,'sebthomson4@gmail.com', 'aaa126');
('seba5',959879568,'sebthomson5@gmail.com', 'aaa127');
SELECT * FROM customers;


INSERT INTO products (name, sku, price, stock, imageurl, category, description) VALUES
('vina san pedro',0001, 10990, 100, 'https://dondelanegra.cl/wp-content/uploads/2022/03/1865-Cabernet-Sauvignon-750cc.jpg','cabernet','sauvignon'),
('apaltagua',0002, 3300, 50, 'https://dondelanegra.cl/wp-content/uploads/2022/05/Apaltagua-Cabernet-Sauvignon-Select-Reserve.jpg','cabernet','select reserve'),
('casillero del diablo', 00003,3790, 35, 'https://dondelanegra.cl/wp-content/uploads/2020/07/85.jpg','cabernet','sauvignon'),
('molina', 0004,5500, 82, 'https://dondelanegra.cl/wp-content/uploads/2020/08/Castillo-De-Molina-Cabernet-Sauvignon-750Cc.jpg','cabernet','sauvignon'),
('cordillera','0005',10990, 65, 'https://dondelanegra.cl/wp-content/uploads/2020/06/49.jpg','cabernet','reserva especial'),
('diablo','0006',5500, 82, 'https://dondelanegra.cl/wp-content/uploads/2021/05/Diablo-Black-Cabernet-Sauvignon-750cc-2019.jpg','cabernet','sauvignon'),
('apaltagua','0007',3300, 82, 'https://dondelanegra.cl/wp-content/uploads/2020/08/Castillo-De-Molina-Cabernet-Sauvignon-750Cc.jpg','merlot','select  reserve'),
('casas patronales','0008',3990, 20, 'https://dondelanegra.cl/wp-content/uploads/2022/06/Casas-Patronales-Merlot-400x400.jpg','merlot','select  reserve'),
('casillero del diablo','0009',3790, 53, 'https://dondelanegra.cl/wp-content/uploads/2021/06/casillero-del-diablo-merlot-400x400.jpg','merlot','reserva'),
('molina','00010', 5600, 35, 'https://dondelanegra.cl/wp-content/uploads/2020/08/Castillo-De-Molina-Merlot-750cc-400x400.jpg','merlot','valle del cachapoal'),
('dona dominga','00011', 5100, 63, 'https://dondelanegra.cl/wp-content/uploads/2022/09/Dona-Dominga-Gran-Reserva-Merlot.jpg','merlot','gran reserva de los andes'),
('lapostolle','00013', 6590, 15, 'https://d1av3r99ggsbkh.cloudfront.net/4293-thickbox_default/pinot-noir-amayna-vina-garces-silva-valle-de-san-antonio.webp','merlot','grand selection');
