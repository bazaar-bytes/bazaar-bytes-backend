const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;
