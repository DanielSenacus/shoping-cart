CREATE TABLE productos(
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NOT NULL,
    product_description TEXT,
    img VARCHAR(2083) DEFAULT NULL,
    price FLOAT NOT NULL DEFAULT 0,
    iva INT DEFAULT NULL,
    stock_id INT DEFAULT NULL,
    PRIMARY KEY(product_id),
    KEY fk_stock(product_id),
    CONSTRAINT fk_stock FOREIGN KEY(stock_id) REFERENCES stock(stock_id) ON UPDATE CASCADE
);
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'Pantalla pro-xl',
        'Eleva el nivel de tu equipo de oficina en casa La resolución Full HD UltraWide(tm) (2560x1080) ofrece un 33% más de espacio de pantalla a lo ancho que el monitor con resolución FHD (1920x1080), por lo que brinda una relación de aspecto 21:9.',
        'https://storage.googleapis.com/isometriclove.appspot.com/imac.png',
        1069900,
        19,
        1
    );
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'Audio-Technica',
        'En la calle, en el colectivo o en la oficina, ten siempre a mano tus audífonos Audio-Technica y ¡escápate de la rutina por un rato! Vas a poder disfrutar de la música que más te gusta y de tus podcasts favoritos cuando quieras y donde quieras.,
     ' https: / / storage.googleapis.com / isometriclove.appspot.com / headphones_S.png,
        218000,
        19,
        2
    );
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'Computador Dell Core',
        NULL,
        'https://storage.googleapis.com/isometriclove.appspot.com/laptop.png',
        2497090,
        19,
        3
    );
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'impresora simple',
        'Eficiencia y calidad\r\nImprimí fácilmente todo lo que quieras con esta impresora HP, ya sean pocas páginas o grandes proyectos.',
        'https://storage.googleapis.com/isometriclove.appspot.com/printer.png',
        379200,
        19,
        4
    );
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'Mac Pro 12 Core',
        NULL,
        'https://storage.googleapis.com/isometriclove.appspot.com/macpro_S.png',
        579200,
        19,
        5
    );
INSERT INTO productos (
        product_name,
        product_description,
        img,
        price,
        iva,
        stock_id
    )
VALUES (
        'Control DualShock 3',
        'con este nuevo control tendras horas de diversion en tu ps3, no lo pienses mas y apantalla a tus amigos con tu nuevo control de PS3¡¡¡',
        'https://storage.googleapis.com/isometriclove.appspot.com/PsController_S.png',
        30000,
        19,
        6
    );
CREATE TABLE stock(
    stock_id INT NOT NULL AUTO_INCREMENT,
    stock_amount BIGINT DEFAULT NULL,
    PRIMARY KEY (stock_id)
);
-- ALTER TABLE stock
-- ADD CONSTRAINT fk_stock FOREIGN KEY(stock_id)
-- REFERENCES productos(stock_id);
INSERT INTO stock (stock_amount)
VALUES (47);
INSERT INTO stock (stock_amount)
VALUES (35);
INSERT INTO stock (stock_amount)
VALUES (36);
INSERT INTO stock (stock_amount)
VALUES (40);
INSERT INTO stock (stock_amount)
VALUES (12);
INSERT INTO stock (stock_amount)
VALUES (20);
CREATE TABLE facturas(
    factura_id INT NOT NULL AUTO_INCREMENT,
    fecha DATE DEFAUL NULL,
    subtotal FLOAT DEFAULT NULL,
    total_factura FLOAT DEFAULT NULL,
    PRIMARY KEY (factura_id)
);
CREATE TABLE pedidos(
    product_id INT DEFAULT NULL,
    precion_unidad FLOAT DEFAULT NULL,
    cantidad INT DEFAULT NULL,
    subtotal_producto BIGINT DEFAULT NULL,
    factura_id INT DEFAULT NULL,
    KEY fk_pedidos_productos(producto_id),
    KEY fk_factura(factura_id),
    CONSTRAINT fk_factura FOREIGN KEY(factura_id) REFERENCES facturas(factura_id) ON UPDATE CASCADE,
    CONSTRAINT fk_pedidos_productos FOREIGN KEY (product_id) REFERENCES productos (product_id) ON DELETE CASCADE
);