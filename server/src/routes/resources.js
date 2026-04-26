const express = require("express");
const asyncHandler = require("express-async-handler");
const Resource = require("../models/Resource");
const { protect, adminOnly } = require("../middleware/auth");
const { upload, fileToUrl } = require("../middleware/upload");
const { crud } = require("../utils/crud");

const router = express.Router();
const c = crud(Resource, {
  listFilter: (req) => (req.query.category ? { category: req.query.category } : {}),
});

router.get("/", c.list);
router.get("/:id", c.getOne);

// POST /api/resources/upload (multipart) — file + metadata
router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const url = fileToUrl(req, req.file);
    const doc = await Resource.create({
      title: req.body.title,
      category: req.body.category,
      grade: req.body.grade,
      description: req.body.description,
      fileUrl: url,
      downloadUrl: url,
    });
    res.status(201).json(doc);
  })
);

router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

// GET /api/resources/:id/download
router.get(
  "/:id/download",
  protect,
  asyncHandler(async (req, res) => {
    const r = await Resource.findById(req.params.id);
    if (!r) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ url: r.downloadUrl || r.fileUrl });
  })
);

module.exports = router;
