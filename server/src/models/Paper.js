const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // pastpaper, monthly, term
    grade: { type: String, default: "" },
    totalMarks: { type: Number, default: 100 },
    duration: { type: String, default: "" },
    uploadDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

paperSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Paper", paperSchema);
