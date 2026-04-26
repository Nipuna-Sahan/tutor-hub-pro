const mongoose = require("mongoose");

// Single document — one tutor profile for the platform.
const tutorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: String,
    bio: String,
    photo: String,
    image: String,
    video: String,
    teachingStyle: String,
    qualifications: { type: [String], default: [] },
    experience: String,
    achievements: {
      type: [{ icon: String, title: String, description: String, _id: false }],
      default: [],
    },
    results: {
      year: String,
      grades: { A: Number, B: Number, C: Number },
    },
    testimonials: {
      type: [{ name: String, grade: String, text: String, rating: Number, _id: false }],
      default: [],
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Tutor", tutorSchema);
