const express = require("express");
const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/students  ?page&limit&search&grade
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 50, 1);
    const filter = {};
    if (req.query.grade) filter.grade = req.query.grade;
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ name: re }, { email: re }, { class: re }];
    }
    const [data, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Student.countDocuments(filter),
    ]);
    res.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  })
);

router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const s = await Student.findById(req.params.id);
    if (!s) {
      res.status(404);
      throw new Error("Student not found");
    }
    res.json(s);
  })
);

router.post(
  "/",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { name, email, phone, grade, class: className } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error("Name and email required");
    }
    // Optionally create login user with a default password
    let user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "Student@123",
        role: "student",
        phone,
        grade,
        class: className,
      });
    }
    const student = await Student.create({
      user: user._id,
      name,
      email,
      phone: phone || "",
      grade: grade || "",
      class: className || "",
      joinedDate: req.body.joinedDate || new Date().toISOString().split("T")[0],
      attendance: req.body.attendance || 0,
      totalPapers: req.body.totalPapers || 0,
      averageScore: req.body.averageScore || 0,
    });
    res.status(201).json(student);
  })
);

router.put(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) {
      res.status(404);
      throw new Error("Student not found");
    }
    res.json(s);
  })
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const s = await Student.findByIdAndDelete(req.params.id);
    if (s?.user) await User.findByIdAndDelete(s.user);
    res.json({ success: true });
  })
);

module.exports = router;
