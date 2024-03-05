const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  // products: [
  //   {
  //     productId: { type: Schema.Types.ObjectId, ref: "Product" },
  //     quantity: Number,
  //   },
  // ],
  products: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
  },
  totalPrice: Number,
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = model("Order", orderSchema);

module.exports = Order;
