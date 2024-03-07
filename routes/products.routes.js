const express = require("express");
const Product = require("../models/Product.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner");

router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => {
      // console.log(products);
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
      // console.log(productFromDB);
      res.status(200).json(productFromDB);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/products", isAuthenticated, (req, res, next) => {
  const { name, description, price, image, category, createdBy } = req.body;
  console.log(req.body);

  Product.create({ name, description, price, image, category, createdBy })
    .then((newProduct) => {
      console.log(newProduct);
      res.status(201).json(newProduct);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.put(
  "/products/:productId",
  isAuthenticated,
  isOwner,
  (req, res, next) => {
    const { name, description, price, image, category, createdBy } = req.body;
    Product.findByIdAndUpdate(
      req.params.productId,
      {
        name,
        description,
        price,
        image,
        category,
        createdBy,
      },
      { new: true }
    )
      .then((updatedProduct) => {
        // console.log(updatedProduct);
        res.status(200).json(updatedProduct);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

router.delete(
  "/products/:productId",
  isAuthenticated,
  isOwner,
  (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
);

module.exports = router;
