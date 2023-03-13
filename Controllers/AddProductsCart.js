//const Cart = require('../Models/Cart');
const Products = require('../Models/Products');
const mongoose = require('mongoose');
const { Cart } = require('./dataCart');




const addProductsCart = async(req, res) => {
    const { nombre, src, precio } = req.body;

    //revisamos si tenemos ese producto
    const estaEnProducts = await Products.findOne({ nombre });

    //revisamos la info
    const noEstaVacio = nombre !== "" && src !== "" && precio !== "";

    //Revisamos si el producto ya esta en carrito
    const estaEnElCarrito = await Cart.findOne({ nombre });

    //Si el producto no esta
    if (!estaEnProducts) {
        res.status(400).json({
            mensaje: 'Este proceso no se encuentra en nuestra BD',
        });
    //Si no envían un prod. que no esta en el cart, lo agregamos
    } else if (noEstaVacio && !estaEnElCarrito){
        const newProductsInCart = new Cart({ nombre, src, precio, amount: 1 });

        //y actualizamos la prop inCart: true en productos
        await Products.findByIdAndUpdate(
            estaEnProducts?._id,
            { inCart: true, nombre, src, precio},
            { new: true }
        )
        .then((products) => {
            newProductsInCart.save();
            res.json({
                mensaje: 'El producto fue agregado al Cart',
                products,
            });
        })
        .catch((error) => console.error(error));

        //Si el prod. ya esta en el carrito, se avisa
    } else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: 'El producto ya esta en el carrito',
        });
    }
};

module.exports = addProductsCart;