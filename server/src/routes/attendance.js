const express = require("express");
const asyncHandler = require("express-async-handler");
const Attendance = require("../models/Attendance");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/attendance?date=YYYY-MM-DD&classId=xxx
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.classId) filter.classRef = req.query.classId;
    const records = await Attendance.find(filter);
    res.json(records);
  })
);

// GET /api/attendance/student/:studentId
router.get(
  "/student/:studentId",
  protect,
  asyncHandler(async (req, res) => {
    const records = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 });
    res.json(records);
  })
);

// GET /api/attendance/stats/:studentId
router.get(
  "/stats/:studentId",
  protect,
  asyncHandler(async (req, res) => {
    const records = await Attendance.find({ student: req.params.studentId });
    const total = records.length;
    const present = records.filter((r) => r.status === "present").length;
    const absent = total - present;
    res.json({
      total,
      present,
      absent,
      percentage: total ? Math.round((present / total) * 100) : 0,
    });
  })
);

function normalize(r) {
  const out = { ...r };
  if (r.studentId && !r.student) out.student = r.studentId;
  if (r.classId && !r.classRef) out.classRef = r.classId;
  delete out.studentId;
  delete out.classId;
  return out;
}

// POST /api/attendance
router.post(
  "/",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const data = normalize(req.body);
    const record = await Attendance.findOneAndUpdate(
      { student: data.student, date: data.date },
      data,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(record);
  })
);

// POST /api/attendance/bulk { records: [...] }
router.post(
  "/bulk",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const list = (req.body.records || []).map(normalize);
    const ops = list.map((r) => ({
      updateOne: {
        filter: { student: r.student, date: r.date },
        update: { $set: r },
        upsert: true,
      },
    }));
    if (ops.length) await Attendance.bulkWrite(ops);
    const dates = [...new Set(list.map((r) => r.date))];
    const saved = await Attendance.find({ date: { $in: dates } });
    res.status(201).json(saved);
  })
);

module.exports = router;
