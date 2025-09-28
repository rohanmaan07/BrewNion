const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60}, 
});

const Otp = mongoose.model("otps", otpSchema);
module.exports = Otp;
