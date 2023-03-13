const Products = require('../Models/Products')

const getProducts = async (req, res) => {
    const products = await Products.find();

    if(products) {
        res.json({ products });
    } else {
        res.json({ mensaje: 'No hay productos'});
    }
};

module.exports = getProducts;


