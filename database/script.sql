CREATE DATABASE IF NOT EXISTS tienda;
USE tienda;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  description TEXT NOT NULL,
  brand VARCHAR(100) NULL,
  img TEXT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO products (name, price, stock, description, brand, img) 
VALUES ('Mouse Gamer', 450.00, 10, 'Mouse óptico RGB', 'Logitech', 'https://example.com/mouse.jpg');