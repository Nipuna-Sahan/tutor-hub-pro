const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    grade: { type: String, default: "" },
    class: { type: String, default: "" },
    joinedDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    attendance: { type: Number, default: 0 },
    totalPapers: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

studentSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Student", studentSchema);
