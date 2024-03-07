const express = require("express");
const Cart = require("../models/Cart.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/cart", isAuthenticated, (req, res, next) => {
  const { products, price, user } = req.body;
  const userEmail = user.email;
  Cart.find({ userEmail })
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((error) => next(error));
});

router.post("/cart", isAuthenticated, (req, res, next) => {
  const { products, price, user } = req.body;
  Cart.create({
    products,
    price,
    user,
  })
    .then((createdCart) => {
      console.log(createdCart);
      res.status(201).json(createdCart);
    })
    .catch((error) => next(error));
});

module.exports = router;
