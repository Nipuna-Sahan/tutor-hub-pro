const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    fileUrl: String,
    notes: String,
    submittedDate: String,
    grade: Number,
    feedback: String,
    status: { type: String, enum: ["submitted", "graded"], default: "submitted" },
  },
  { _id: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    subject: { type: String, default: "" },
    dueDate: { type: String, required: true },
    submissions: { type: [submissionSchema], default: [] },
  },
  { timestamps: true }
);

assignmentSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
