const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["present", "absent"], default: "present" },
    classRef: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    class: { type: String },
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

attendanceSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    r.studentId = r.student?.toString?.() || r.student;
    r.classId = r.classRef?.toString?.() || r.classRef;
    delete r._id;
    delete r.__v;
    delete r.classRef;
    return r;
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
