const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
   nombre: { type: String, required: true, unique: true },
   precio: { type: Number, required: true},
   amount: { type: Number, required: true },
   src: { type: String, required: true },    
})

module.exports = model("Cart", CartSchema);
