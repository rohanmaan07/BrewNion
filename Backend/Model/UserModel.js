const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String }, // Google login users ke liye optional
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  mobileNumber: { type: String, unique: true, sparse: true }, // unique mobile for OTP login
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "addresses" }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
