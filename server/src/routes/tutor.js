const express = require("express");
const asyncHandler = require("express-async-handler");
const Tutor = require("../models/Tutor");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const tutor = (await Tutor.findOne()) || {};
    res.json(tutor);
  })
);

router.put(
  "/",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const existing = await Tutor.findOne();
    if (existing) {
      Object.assign(existing, req.body);
      await existing.save();
      return res.json(existing);
    }
    const created = await Tutor.create(req.body);
    res.json(created);
  })
);

module.exports = router;
