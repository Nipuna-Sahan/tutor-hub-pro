const express = require("express");
const Announcement = require("../models/Announcement");
const { protect, adminOnly } = require("../middleware/auth");
const { crud } = require("../utils/crud");

const router = express.Router();
const c = crud(Announcement, {
  listFilter: (req) => (req.query.active === "true" ? { active: true } : {}),
});

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

module.exports = router;
