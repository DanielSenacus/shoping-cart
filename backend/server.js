const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const cors = require('cors');
const { query } = require('express');

const servidor = express();

servidor.use(cors());

servidor.use(express.json());


servidor.use(bodyParser.json());
// conecciones

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xxxtentacion100',
    database: 'bryan_store_db',
});


// Route
servidor.get('/', (req, res) => {
    res.send('Bienvenido');
});

// get products
servidor.get('/products', (req, res) => {
    const sql = 'SELECT * FROM productos NATURAL JOIN stock;';

    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('no hay productos');
        }
    })
});
;
servidor.get('/stock', (req, res) => {
    const sql = 'SELECT product_name,img,stock_id,stock_amount FROM productos NATURAL JOIN stock;';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('no hay st');
        }
    })
});

servidor.post('/add', (req, res) => {

    const { totalPrice, cartItems, fecha, subtotal } = req.body;

    const newFactura = {
        fecha,
        subtotal,
        total_factura: totalPrice
    };

    const sql = 'INSERT INTO facturas SET ?';

    connection.query(sql, [newFactura], error => {
        if (error) throw error;

    });

    connection.query('SELECT factura_id FROM facturas ORDER BY factura_id DESC LIMIT 1', (err, resultado) => {

        const finalID = resultado[0].factura_id;
        console.log(finalID);

        cartItems.map((item) => {
            const { product_id, product_name, cantidad, price } = item;
            const sql = 'INSERT INTO pedidos SET ?';
            const newPedido = {
                product_id,
                precio_unidad: price,
                cantidad,
                subtotal_producto: price * cantidad,
                factura_id: finalID

            };

            connection.query(sql, [newPedido], error => {
                if (error) throw error;


            });

        });


    });






    res.send('todo creado papi!');


});

servidor.get('/bills', (req, res) => {

    const sql = 'SELECT * FROM facturas'
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('no hay facturas');
        }
    })
})

servidor.get('/pedidos', (req, res) => {

    const sql = 'SELECT * FROM pedidos LEFT JOIN productos ON pedidos.product_id = productos.product_id;'
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('no hay pedidos pai');
        }
    })
})

// update invetory
servidor.put('/update', (req, res) => {

    const { cartItems } = req.body;

    cartItems.map((item) => {
        const { stock_id, stock_amount, cantidad } = item;

        let newStock = stock_amount - cantidad;
        const sql = `UPDATE stock SET stock_amount = '${newStock}' WHERE stock_id = ${stock_id};`;

        connection.query(sql, error => {
            if (error) throw error;

        });

    });

    res.send('stock updated!');

});
servidor.delete('/delete/:id', (req, res) => {
    res.send('delete product');
});

// chekeo

connection.connect(error => {
    if (error) throw error;
    console.log('Database is all ok bro');
})

servidor.listen(PORT, () => console.log(`server running on port ${PORT}`));

