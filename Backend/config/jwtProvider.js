const jwt = require("jsonwebtoken");
const SECRET_KEY = "apkjnlkjhohobohb";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

module.exports = { generateToken };