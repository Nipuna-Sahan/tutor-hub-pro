const express = require("express");
const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Student = require("../models/Student");
const { protect } = require("../middleware/auth");

const router = express.Router();

async function getStudentForUser(user) {
  if (user.role !== "student") return null;
  return Student.findOne({ user: user._id });
}

// GET /api/messages/conversations
router.get(
  "/conversations",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user.role === "admin") {
      const list = await Conversation.find().sort({ lastMessageTime: -1 });
      return res.json(list);
    }
    const student = await getStudentForUser(req.user);
    if (!student) return res.json([]);
    let conv = await Conversation.findOne({ student: student._id });
    if (!conv) {
      conv = await Conversation.create({
        student: student._id,
        studentName: student.name,
        messages: [],
      });
    }
    res.json([conv]);
  })
);

router.get(
  "/conversations/:id",
  protect,
  asyncHandler(async (req, res) => {
    const conv = await Conversation.findById(req.params.id);
    if (!conv) {
      res.status(404);
      throw new Error("Conversation not found");
    }
    res.json(conv);
  })
);

// POST /api/messages/send  { conversationId, text }
router.post(
  "/send",
  protect,
  asyncHandler(async (req, res) => {
    const { conversationId, text, attachments } = req.body;
    if (!text) {
      res.status(400);
      throw new Error("Text required");
    }
    const conv = await Conversation.findById(conversationId);
    if (!conv) {
      res.status(404);
      throw new Error("Conversation not found");
    }
    const sender = req.user.role === "admin" ? "teacher" : "student";
    conv.messages.push({
      sender,
      text,
      timestamp: new Date().toISOString(),
      read: false,
      attachments: attachments || [],
    });
    conv.lastMessageTime = new Date().toISOString();
    await conv.save();
    res.status(201).json(conv.messages[conv.messages.length - 1]);
  })
);

// PATCH /api/messages/conversations/:id/read
router.patch(
  "/conversations/:id/read",
  protect,
  asyncHandler(async (req, res) => {
    const conv = await Conversation.findById(req.params.id);
    if (!conv) {
      res.status(404);
      throw new Error("Not found");
    }
    const otherSender = req.user.role === "admin" ? "student" : "teacher";
    conv.messages.forEach((m) => {
      if (m.sender === otherSender) m.read = true;
    });
    await conv.save();
    res.json({ success: true });
  })
);

// GET /api/messages/unread-count
router.get(
  "/unread-count",
  protect,
  asyncHandler(async (req, res) => {
    const otherSender = req.user.role === "admin" ? "student" : "teacher";
    const filter = {};
    if (req.user.role === "student") {
      const student = await getStudentForUser(req.user);
      if (!student) return res.json({ count: 0 });
      filter.student = student._id;
    }
    const convs = await Conversation.find(filter);
    const count = convs.reduce(
      (sum, c) => sum + c.messages.filter((m) => m.sender === otherSender && !m.read).length,
      0
    );
    res.json({ count });
  })
);

module.exports = router;
