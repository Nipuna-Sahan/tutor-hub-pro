const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) token = auth.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User no longer exists");
    }
    next();
  } catch (e) {
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  res.status(403);
  throw new Error("Admin access required");
};

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

module.exports = { protect, adminOnly, signToken };
