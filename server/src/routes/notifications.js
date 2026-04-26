const express = require("express");
const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const list = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(list);
  })
);

router.get(
  "/unread-count",
  protect,
  asyncHandler(async (req, res) => {
    const count = await Notification.countDocuments({ user: req.user._id, read: false });
    res.json({ count });
  })
);

router.patch(
  "/:id/read",
  protect,
  asyncHandler(async (req, res) => {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true }
    );
    res.json({ success: true });
  })
);

router.patch(
  "/read-all",
  protect,
  asyncHandler(async (req, res) => {
    await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
    res.json({ success: true });
  })
);

// Admin/internal helper: POST /api/notifications  { user, title, message, type, link }
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const doc = await Notification.create({
      user: req.body.user || req.user._id,
      title: req.body.title,
      message: req.body.message,
      type: req.body.type || "info",
      link: req.body.link,
    });
    res.status(201).json(doc);
  })
);

module.exports = router;
