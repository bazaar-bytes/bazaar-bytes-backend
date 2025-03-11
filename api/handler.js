const app = require("../app"); // Importiere dein Express-App-Setup
const serverless = require("serverless-http");

module.exports = serverless(app);
