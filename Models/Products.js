const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
   nombre: { type: String, required: true},
   precio: { type: Number, required: true},
   inCart: { type: Boolean, default: false },
   src: { type: String, required: true },    
})

module.exports = model('Products', ProductSchema);