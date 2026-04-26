const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String },
    paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper" },
    paperName: { type: String, required: true },
    paperTitle: { type: String },
    type: { type: String, default: "pastpaper" },
    score: { type: Number, required: true },
    totalMarks: { type: Number, default: 100 },
    rank: { type: Number, default: 0 },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

markSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    r.studentId = r.student?.toString?.() || r.student;
    r.paperId = r.paper?.toString?.() || r.paper;
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Mark", markSchema);
