const Product = require("../models/Product.model");

const isOwner = async (req, res, next) => {
  console.log(req.payload);

  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.createdBy.equals(req.payload._id)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }

    // User is the owner, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in isOwner middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isOwner;
