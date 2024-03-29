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
      res.status(201).json(createdCart);
    })
    .catch((error) => next(error));
});

router.delete("/cart/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;
  CartItem.deleteMany({ product: req.params.productId })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

router.delete("/cart/reduceQuantity/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  CartItem.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

router.delete("/cart", isAuthenticated, (req, res, next) => {
  CartItem.deleteMany({ user: req.payload._id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

module.exports = router;
