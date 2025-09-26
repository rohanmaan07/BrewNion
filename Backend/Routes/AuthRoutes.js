const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwtProvider.js");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).send({ error: "User already exists with this email." });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    return res.status(201).send({ token, message: "Signup successful." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password." });
    }
    const token = generateToken(user._id);
    const { password: pwd, ...safeUser } = user.toObject();
    return res.status(200).send({ token, user: safeUser, message: "Login successful." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
