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
  const { product, user } = req.body;
  console.log("reqBody", req.body);
  CartItem.create({
    product,
    user,
  })
    .then((createdCart) => {
      console.log(createdCart);
      res.status(201).json(createdCart);
    })
    .catch((error) => next(error));
});

router.delete("/cart/:productId", isAuthenticated, (req, res, next) => {
  CartItem.findByIdAndDelete(req.params.productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

module.exports = router;
