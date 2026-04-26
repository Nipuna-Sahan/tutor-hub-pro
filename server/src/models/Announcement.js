const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    important: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

announcementSchema.set("toJSON", {
  virtuals: true,
  transform: (_d, r) => {
    r.id = r._id.toString();
    delete r._id;
    delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
