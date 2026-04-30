const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["student", "teacher"], required: true },
    text: { type: String, required: true },
    timestamp: { type: String, default: () => new Date().toISOString() },
    read: { type: Boolean, default: false },
    attachments: { type: Array, default: [] },
  },
  { _id: true }
);

messageSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    return r;
  },
});

const conversationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, required: true },
    messages: { type: [messageSchema], default: [] },
    lastMessageTime: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

conversationSchema.virtual("unreadCount").get(function () {
  // Unread for the teacher = messages from student not yet read
  return this.messages.filter((m) => m.sender === "student" && !m.read).length;
});

conversationSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    // Safely expose studentId whether `student` is an ObjectId or a populated doc
    if (r.student) {
      r.studentId =
        typeof r.student === "object" && r.student._id
          ? r.student._id.toString()
          : r.student.toString();
    }
    delete r._id;
    delete r.__v;
    delete r.student;
    return r;
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
