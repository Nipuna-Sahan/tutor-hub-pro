const express = require("express");
const Class = require("../models/Class");
const { protect, adminOnly } = require("../middleware/auth");
const { crud } = require("../utils/crud");

const router = express.Router();
const c = crud(Class);

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

module.exports = router;
