const express = require("express");
const Paper = require("../models/Paper");
const { protect, adminOnly } = require("../middleware/auth");
const { crud } = require("../utils/crud");

const router = express.Router();
const c = crud(Paper, {
  listFilter: (req) => (req.query.type ? { type: req.query.type } : {}),
});

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

module.exports = router;
