const express = require("express");
const asyncHandler = require("express-async-handler");
const Mark = require("../models/Mark");
const Student = require("../models/Student");
const Paper = require("../models/Paper");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

async function enrich(payload) {
  const out = { ...payload };
  if (payload.studentId && !payload.student) out.student = payload.studentId;
  if (payload.paperId && !payload.paper) out.paper = payload.paperId;
  if (out.student) {
    const s = await Student.findById(out.student);
    if (s) out.studentName = s.name;
  }
  if (out.paper) {
    const p = await Paper.findById(out.paper);
    if (p) {
      out.paperName = out.paperName || p.title;
      out.paperTitle = out.paperTitle || p.title;
      out.type = out.type || p.type;
      out.totalMarks = out.totalMarks || p.totalMarks;
    }
  }
  return out;
}

// GET /api/marks?studentId=xxx
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.studentId) filter.student = req.query.studentId;
    const marks = await Mark.find(filter).sort({ date: -1 });
    res.json(marks);
  })
);

// GET /api/marks/leaderboard?paperId=xxx
router.get(
  "/leaderboard",
  protect,
  asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.paperId) filter.paper = req.query.paperId;
    const marks = await Mark.find(filter).sort({ score: -1 }).limit(50);
    res.json(marks);
  })
);

router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const m = await Mark.findById(req.params.id);
    if (!m) {
      res.status(404);
      throw new Error("Mark not found");
    }
    res.json(m);
  })
);

router.post(
  "/",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const data = await enrich(req.body);
    const m = await Mark.create(data);
    res.status(201).json(m);
  })
);

// POST /api/marks/bulk { marks: [...] }
router.post(
  "/bulk",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const list = await Promise.all((req.body.marks || []).map(enrich));
    const created = await Mark.insertMany(list);
    res.status(201).json(created);
  })
);

router.put(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const data = await enrich(req.body);
    const m = await Mark.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!m) {
      res.status(404);
      throw new Error("Mark not found");
    }
    res.json(m);
  })
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    await Mark.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  })
);

module.exports = router;
