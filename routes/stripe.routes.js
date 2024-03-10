const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout-session", isAuthenticated, (req, res) => {
  console.log("req.body", req.body);
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "DE"],
      },
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        };
      }),

      success_url: `http://localhost:5173/payment/success`,
      cancel_url: `http://localhost:5173/login`,
    })
    .then((response) => {
      console.log(response);
      res.json({ url: response.url });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
