const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Advocate = require("../models/advocate");

// ✅ REGISTER Advocate (with hashed password)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, password } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdvocate = new Advocate({
      fullName,
      email,
      phoneNumber,
      bio,
      password: hashedPassword,
    });

    await newAdvocate.save();

    res.status(201).json({ message: "Advocate added successfully", advocate: newAdvocate });
  } catch (error) {
    res.status(500).json({ message: "Error creating advocate", error });
  }
});

// ✅ LOGIN Advocate (creates JWT token that lasts 12 hours)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const advocate = await Advocate.findOne({ email });
    if (!advocate) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, advocate.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: advocate._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// ✅ GET All Advocates
router.get("/", async (req, res) => {
  try {
    const advocates = await Advocate.find();
    res.json({ advocates });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving advocates", error });
  }
});

module.exports = router;
