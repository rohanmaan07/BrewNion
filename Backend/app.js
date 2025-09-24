const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server connecting...");
});

module.exports = app;
