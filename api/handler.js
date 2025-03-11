const app = require("../app"); // Importiere dein Express-App-Setup
const serverless = require("serverless-http");

app.get("/debug", (req, res) => {
  res.json({ message: "Express on Vercel is working!" });
});

module.exports = serverless(app);
