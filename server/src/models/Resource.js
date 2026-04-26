const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "notes" },
    grade: { type: String, default: "" },
    fileUrl: { type: String },
    downloadUrl: { type: String },
    uploadDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

resourceSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
