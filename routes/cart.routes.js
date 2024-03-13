const express = require("express");
const CartItem = require("../models/Cart.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/cart", isAuthenticated, (req, res, next) => {
  const currentUserId = req.payload._id;

  CartItem.find({ user: currentUserId })
    .populate("product")
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((error) => next(error));
});

router.post("/cart", isAuthenticated, (req, res, next) => {
  const { product } = req.body;
  CartItem.create({
    product,
    user: req.payload._id,
  })
    .then((createdCart) => {
      console.log("createdCart", createdCart);
      res.status(201).json(createdCart);
    })
    .catch((error) => next(error));
});

// router.put("/cart/:productId", isAuthenticated, (req, res, next) => {
//   const { productId } = req.params;
//   const { product, user } = req.body;
//   CartItem.findByIdAndUpdate(
//     productId,{quantity:}

//     { new: true }
//   );
// });

router.delete("/cart/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  CartItem.deleteMany({ product: req.params.productId })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

router.delete("/cart/reduceQuantity/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  CartItem.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

router.delete("/cart", isAuthenticated, (req, res, next) => {
  console.log("user", req.payload);
  CartItem.deleteMany({ user: req.payload._id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

module.exports = router;
