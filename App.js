const express = require('express');
const cors = require('cors');
const db = require('./Database')

const controllers = require('./Controllers');

const app = express();

app.use(cors());
app.use(express.json());

//get para productos de DB / get para productos de carrito
app.get('/products', controllers.getProducts);
app.get('/products-cart', controllers.getProductsCart);

//ruta post para agregar los productos al carrito
app.post('/products-cart', controllers.addProductsCart);

//ruta put agrega o disminuye cant. de productos en el carrito.
app.put('/products-cart/:productsId', controllers.putProducts);

//ruta delete para eliminar productos del carrito
app.delete('/products-cart/:productsId', controllers.deleteProducts);




//console
app.listen(4000, () => {
    console.log('Server funcionando en el puerto 4000')
    db();
});

module.exports = app;