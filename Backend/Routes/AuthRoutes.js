const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwtProvider.js");
const Otp = require("../Model/OtpModel.js");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;
    const isUserExist = await User.findOne({ 
      $or: [{ email }, { mobileNumber }]
    });

    if (isUserExist) {
      return res.status(409).send({ error: "User already exists with this email or mobile number." });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 8) : null;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
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

router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).send({ message: "Phone number required" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { phone },
      { otp: otpCode, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    console.log(`📲 OTP for ${phone}: ${otpCode}`);

    return res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).send({ message: "Phone and OTP required" });

    const otpDoc = await Otp.findOne({ phone });
    if (!otpDoc) return res.status(400).send({ message: "OTP not found or expired" });

    if (otpDoc.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    await Otp.deleteOne({ phone });

    let user = await User.findOne({ mobileNumber: phone });
    if (!user) {
      user = await User.create({
        firstName: "Guest",
        lastName: "User",
        email: `${phone}@guest.com`,
        mobileNumber: phone,
      });
    }

    const token = generateToken(user._id);
    const { password: pwd, ...safeUser } = user.toObject();
    return res.status(200).send({ token, user: safeUser, message: "OTP verified, login successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
