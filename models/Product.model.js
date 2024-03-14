const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  },
  category: {
    type: String,
    enum: [
      "tech",
      "clothes",
      "furniture",
      "collectibles",
      "books",
      "vehicles",
      "other",
    ],
    default: "other",
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = model("Product", productSchema);

module.exports = Product;
