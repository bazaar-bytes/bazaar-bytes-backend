const express = require("express");
const Order = require("../models/Order.model");
const router = express.Router();

router.get("/orders", (req, res, next) => {
  Order.find({})
    .then((orders) => {
      console.log(orders);
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/orders/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .then((orderFromDB) => {
      console.log(orderFromDB);
      res.status(200).json(orderFromDB);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/orders", (req, res, next) => {
  const { products, totalPrice, shippingAddress, user } = req.body;
  products.length > 0
    ? Order.create({ products, totalPrice, shippingAddress, user })
        .then((newOrder) => {
          console.log(newOrder);
          res.status(201).json(newOrder);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        })
    : res.status(400).send({ message: "Provide at least one product!" });
});

module.exports = router;
