const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadDir = path.resolve(process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

function fileToUrl(req, file) {
  if (!file) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
}

module.exports = { upload, fileToUrl };
