const express = require("express");
const asyncHandler = require("express-async-handler");
const Assignment = require("../models/Assignment");
const Student = require("../models/Student");
const { protect, adminOnly } = require("../middleware/auth");
const { upload, fileToUrl } = require("../middleware/upload");

const router = express.Router();

function statusFor(assignment, studentId) {
  const sub = assignment.submissions.find((s) => String(s.student) === String(studentId));
  if (sub) return sub.grade != null ? "graded" : "submitted";
  return new Date(assignment.dueDate) < new Date() ? "overdue" : "pending";
}

function shape(a, studentId) {
  const obj = a.toJSON();
  if (studentId) {
    const sub = a.submissions.find((s) => String(s.student) === String(studentId));
    obj.status = statusFor(a, studentId);
    obj.submittedDate = sub?.submittedDate;
    obj.grade = sub?.grade;
    obj.feedback = sub?.feedback;
  }
  return obj;
}

// GET /api/assignments — students see own status, admins see raw
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const items = await Assignment.find().sort({ dueDate: 1 });
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      res.json(items.map((a) => shape(a, student?._id)));
    } else {
      res.json(items.map((a) => a.toJSON()));
    }
  })
);

router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const a = await Assignment.findById(req.params.id);
    if (!a) {
      res.status(404);
      throw new Error("Not found");
    }
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      res.json(shape(a, student?._id));
    } else res.json(a);
  })
);

router.post(
  "/",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const a = await Assignment.create(req.body);
    res.status(201).json(a);
  })
);

router.put(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const a = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(a);
  })
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  })
);

// POST /api/assignments/:id/submit (multipart) — file + notes
router.post(
  "/:id/submit",
  protect,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const a = await Assignment.findById(req.params.id);
    if (!a) {
      res.status(404);
      throw new Error("Assignment not found");
    }
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      res.status(400);
      throw new Error("No student profile linked to this account");
    }
    const fileUrl = req.file ? fileToUrl(req, req.file) : req.body.fileUrl;
    if (!fileUrl) {
      res.status(400);
      throw new Error("File required");
    }
    const existingIdx = a.submissions.findIndex((s) => String(s.student) === String(student._id));
    const sub = {
      student: student._id,
      fileUrl,
      notes: req.body.notes || "",
      submittedDate: new Date().toISOString(),
      status: "submitted",
    };
    if (existingIdx >= 0) a.submissions[existingIdx] = { ...a.submissions[existingIdx], ...sub };
    else a.submissions.push(sub);
    await a.save();
    res.json(shape(a, student._id));
  })
);

// POST /api/assignments/:id/grade  { studentId, grade, feedback }
router.post(
  "/:id/grade",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { studentId, grade, feedback } = req.body;
    const a = await Assignment.findById(req.params.id);
    if (!a) {
      res.status(404);
      throw new Error("Not found");
    }
    const sub = a.submissions.find((s) => String(s.student) === String(studentId));
    if (!sub) {
      res.status(404);
      throw new Error("Submission not found");
    }
    sub.grade = grade;
    sub.feedback = feedback;
    sub.status = "graded";
    await a.save();
    res.json(a);
  })
);

module.exports = router;
