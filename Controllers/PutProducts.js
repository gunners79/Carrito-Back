//const Cart = require('../models/cart');
const { Cart } = require('./dataCart');

const putProducts = async (req, res) => {
  const { productsId } = req.params;
  const { query } = req.query;
  const body = req.body;

  // Buscamos el producto en el cart
  const productsBuscado = await Cart.findById(productsId);

  // Si no hay query 'add' o 'del'
  if (!query) {
    res.status(404).json({ mensaje: 'Debes enviar una query' });
  } else if (productsBuscado && query === 'add') {
    // Si esta el prod. y quiero agregar
    body.amount = body.amount + 1;

    await Cart.findByIdAndUpdate(productsId, body, {
      new: true,
    }).then((products) => {
      res.json({
        mensaje: `El producto: ${products.nombre} fue actualizado`,
        products,
      });
    });
  } else if (productsBuscado && query === 'del') {
    // Si el prod. ya está y quiero sacarlo
    body.amount = body.amount - 1;

    await Cart.findByIdAndUpdate(productsId, body, {
      new: true,
    }).then((products) => {
      res.json({
        mensaje: `El producto: ${products.nombre} fue actualizado`,
        products,
      });
    });
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error' });
  }
};

module.exports = putProducts;
