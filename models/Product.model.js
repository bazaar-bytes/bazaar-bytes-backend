const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  category: {
    type: String,
    enum: ["tech", "clothes", "furniture", "collectibles", "books", "vehicles"],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = model("Product", productSchema);

module.exports = Product;
