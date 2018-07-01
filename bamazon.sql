DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Shimano Stella Reel', 'Fishing', 699.99, 20),
	   ('St. Croix Rod', 'Fishing', 159.99, 50),
	   ('LiveTarget Mullet', 'Fishing', 9.99, 100),
	   ('Columbia Tent', 'Camping', 299.99, 5),
	   ('Igloo Cooler', 'Camping', 49.99, 50),
	   ('Headlamp', 'Camping', 19.99, 40),
	   ('Rifle', 'Hunting', 899.99, 5),
	   ('Ammo', 'Hunting', 29.99, 100),
	   ('Scope', 'Hunting', 199.99, 5),
	   ('Bamazon T-Shirt', 'Clothing', 19.99, 100);
