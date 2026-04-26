const express = require("express");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/User");
const Student = require("../models/Student");
const { protect, signToken } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login  { email, password, role }
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password required");
    }
    const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    if (role && user.role !== role) {
      res.status(403);
      throw new Error(`This account is not a ${role} account`);
    }
    res.json({ token: signToken(user._id), user: user.toPublic() });
  })
);

// POST /api/auth/register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, grade, class: className } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Missing required fields");
    }
    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      res.status(409);
      throw new Error("Email already registered");
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      grade,
      class: className,
      role: "student",
    });
    // Auto-create matching Student profile
    await Student.create({
      user: user._id,
      name,
      email,
      phone: phone || "",
      grade: grade || "",
      class: className || "",
    });
    res.status(201).json({ token: signToken(user._id), user: user.toPublic() });
  })
);

// POST /api/auth/logout (stateless — client just drops the token)
router.post("/logout", (_req, res) => res.json({ success: true }));

// GET /api/auth/profile
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => res.json(req.user.toPublic()))
);

// PUT /api/auth/profile
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const fields = ["name", "avatar", "phone", "grade", "class"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) req.user[f] = req.body[f];
    });
    await req.user.save();
    res.json(req.user.toPublic());
  })
);

// POST /api/auth/change-password
router.post(
  "/change-password",
  protect,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.matchPassword(currentPassword))) {
      res.status(401);
      throw new Error("Current password incorrect");
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true });
  })
);

// POST /api/auth/forgot-password
router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (user) {
      user.resetToken = crypto.randomBytes(20).toString("hex");
      user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      console.log(`🔑 Reset token for ${user.email}: ${user.resetToken}`);
    }
    // Always succeed to avoid leaking which emails exist
    res.json({ success: true });
  })
);

// POST /api/auth/reset-password
router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired token");
    }
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.json({ success: true });
  })
);

module.exports = router;
