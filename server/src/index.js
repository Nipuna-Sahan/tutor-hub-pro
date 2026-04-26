require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

// CORS — allow the Vite dev server + any configured origin
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:8080,http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((o) => o.trim());
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(null, true); // permissive in dev; tighten for prod
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static uploads
const uploadDir = path.resolve(process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(uploadDir));

// Health
app.get("/", (_req, res) => res.json({ ok: true, name: "Tuition LMS API" }));
app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/papers", require("./routes/papers"));
app.use("/api/marks", require("./routes/marks"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/resources", require("./routes/resources"));
app.use("/api/videos", require("./routes/videos"));
app.use("/api/assignments", require("./routes/assignments"));
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/tutor", require("./routes/tutor"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
});
