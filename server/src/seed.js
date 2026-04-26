require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Student = require("./models/Student");
const Tutor = require("./models/Tutor");

async function run() {
  await connectDB();

  // Admin
  const adminEmail = "admin@tuition.lk";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: "Admin@123",
      role: "admin",
    });
    console.log("✅ Admin created:", adminEmail, "/ Admin@123");
  } else console.log("ℹ️  Admin already exists");

  // Demo student
  const studentEmail = "student@tuition.lk";
  let user = await User.findOne({ email: studentEmail });
  if (!user) {
    user = await User.create({
      name: "Demo Student",
      email: studentEmail,
      password: "Student@123",
      role: "student",
      grade: "Grade 11",
      class: "Mathematics",
    });
    await Student.create({
      user: user._id,
      name: "Demo Student",
      email: studentEmail,
      grade: "Grade 11",
      class: "Mathematics",
    });
    console.log("✅ Student created:", studentEmail, "/ Student@123");
  } else console.log("ℹ️  Demo student already exists");

  // Tutor profile
  const tutorCount = await Tutor.countDocuments();
  if (!tutorCount) {
    await Tutor.create({
      name: "Mr. Sample Tutor",
      title: "Senior Mathematics Teacher",
      bio: "20+ years of experience preparing students for national exams.",
      qualifications: ["BSc (Hons) Mathematics", "PGDE"],
      experience: "20+ years",
      results: { year: "2024", grades: { A: 85, B: 12, C: 3 } },
    });
    console.log("✅ Tutor profile created");
  }

  await mongoose.disconnect();
  console.log("🎉 Seed complete");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
