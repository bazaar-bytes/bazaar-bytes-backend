const express = require("express");
const Product = require("../models/Product.model");
const router = express.Router();

router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => {
      console.log(products);
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/products/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then((productFromDB) => {
      console.log(productFromDB);
      res.status(200).json(productFromDB);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/products", (req, res, next) => {
  const { name, description, price, image, category, user } = req.body;

  Product.create({ name, description, price, image, category, user })
    .then((newProduct) => {
      console.log(newProduct);
      res.status(201).json(newProduct);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.put("/products/:productId", (req, res, next) => {
  const { name, description, price, image, category, user } = req.body;
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name,
      description,
      price,
      image,
      category,
      user,
    },
    { new: true }
  )
    .then((updatedProduct) => {
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.delete("/products/:productId", (req, res, next) => {
  Product.findByIdAndDelete(req.params.productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
