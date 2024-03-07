const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],

  price: Number,

  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
