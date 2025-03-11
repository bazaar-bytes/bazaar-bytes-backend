// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
console.log("JWT_SECRET:", process.env.TOKEN_SECRET);

// ℹ️ Connects to the database
require("../db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("../config")(app);

// 👇 Start handling routes here
const productsRoutes = require("../routes/products.routes");
app.use("/api", productsRoutes);

const ordersRoutes = require("../routes/orders.routes");
app.use("/api", ordersRoutes);
const cartRoutes = require("../routes/cart.routes");
app.use("/api", cartRoutes);

const authRoutes = require("../routes/auth.routes");
app.use("/auth", authRoutes);

const stripeRoutes = require("../routes/stripe.routes");
app.use("/api", stripeRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("../error-handling")(app);

module.exports = app;
