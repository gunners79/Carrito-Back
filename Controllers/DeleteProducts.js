//const Cart = require('../Models/Cart');
//const Products = require('./addProductsCart.js');
const { Cart } = require('./dataCart');
const { findOne }  = require('mongoose');
const Products = require('../Models/Products')


const deleteProducts = async(req, res) => {
    const { productsId } = req.params;

    //Busca el prod. en el cart
    const productsInCart = await Cart.findById(productsId);


    //Busca al producto en la DB por el 'nombre' en DB
    const { nombre, src, precio, _id } = await Products.findOne({
        nombre: productsInCart.nombre,
    });


    //busca y elimina el producto con la id
    await Cart.findByIdAndDelete(productsId);

    await Products.findByIdAndUpdate(
        _id,
        { inCart: false, nombre, src, precio },
        { new: true }
    )
        .then((products) => {
            res.json({
                mensaje: `El producto ${products.nombre} fue eliminado del carrito`,
            });
        })
        .catch((error) => res.json({ mensaje: 'Hubo un error'}));
};

module.exports = deleteProducts;