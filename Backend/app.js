const express = require("express");
const authRoutes = require("./Routes/AuthRoutes")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server connecting...");
});

app.use("/auth", authRoutes); 

module.exports = app;
