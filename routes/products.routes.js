const express = require("express");
const Product = require("../models/Product.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isOwner = require("../middleware/isOwner");

router.get("/products", (req, res, next) => {
  Product.find({})
    .populate("createdBy")
    .then((products) => {
      console.log("Results:");
      console.log(products);
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/products/search", (req, res, next) => {
  const searchQuery = req.query.q;

  const searchPattern = new RegExp(searchQuery, "i");

  Product.find({
    $or: [
      { name: { $regex: searchPattern } },
      { description: { $regex: searchPattern } },
    ],
  })
    .populate("createdBy")
    .then((products) => {
      console.log("Results:");

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
      res.status(200).json(productFromDB);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/my-products", isAuthenticated, (req, res) => {
  const userId = req.payload._id;
  Product.find({ createdBy: userId })
    .then((products) => res.status(200).json(products))
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.post("/products", isAuthenticated, (req, res, next) => {
  const { name, description, price, image, category, createdBy } = req.body;

  if (name === "" || description === "" || price === "") {
    res
      .status(400)
      .json({ message: "Name, description and price are required" });
  }

  Product.create({ name, description, price, image, category, createdBy })
    .then((newProduct) => {
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
