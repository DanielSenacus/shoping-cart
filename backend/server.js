const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const cors = require('cors');

const servidor = express();

servidor.use(cors());

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
    const sql = 'SELECT * FROM product';

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
    const sql = 'SELECT * FROM product JOIN inventario WHERE product.id = inventario.product_id';

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
    res.send('nuevo producto');
});

// update invetory
servidor.put('/update/:id', (req, res) => {
    res.send('update stock')
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

