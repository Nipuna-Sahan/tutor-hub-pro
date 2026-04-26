const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    grade: { type: String, required: true },
    institution: { type: String, default: "" },
    description: { type: String, default: "" },
    syllabus: { type: [String], default: [] },
    timetable: {
      type: [{ day: String, time: String, _id: false }],
      default: [],
    },
    fees: {
      monthly: { type: String, default: "" },
      term: { type: String, default: "" },
    },
    features: { type: [String], default: [] },
  },
  { timestamps: true }
);

classSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Class", classSchema);
