CREATE TABLE Product(
    id BIGINT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(75) NOT NULL,
    product_description TINYTEXT NULL,
    price FLOAT NOT NULL DEFAULT 0,
    IVA INT NULL,
    stock INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (stock) REFERENCES inventory(cantidad)
);