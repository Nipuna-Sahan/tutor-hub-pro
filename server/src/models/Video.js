const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    subject: { type: String, default: "" },
    grade: { type: String, default: "" },
    duration: { type: String, default: "" },
    videoUrl: { type: String },
    url: { type: String },
    thumbnailUrl: { type: String },
    thumbnail: { type: String },
    uploadDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

videoSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Video", videoSchema);
