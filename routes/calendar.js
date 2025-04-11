const express = require("express");
const router = express.Router();
const Calendar = require("../models/calendar");
const authenticateAdvocate = require("../middleware/auth");

// GET All Calendar Entries
router.get("/", async (req, res) => {
  try {
    const calendarEntries = await Calendar.find();
    res.status(200).json({ calendar: calendarEntries });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving calendar entries", error });
  }
});

// CREATE a Calendar Entry
router.post("/", async (req, res) => {
  try {
    const { Advocate_id, clientName, date, reason } = req.body;
    if (!Advocate_id || !clientName || !date || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCalendarEntry = new Calendar({ Advocate_id, clientName, date, reason });
    await newCalendarEntry.save();
    res.status(201).json({ message: "Calendar entry created successfully", calendarEntry: newCalendarEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating calendar entry", error });
  }
});

// ✅ GET Calendar Entries for Logged-in Advocate
router.get("/my", authenticateAdvocate, async (req, res) => {
  try {
    const calendarEntries = await Calendar.find({ Advocate_id: req.advocate.id });
    res.status(200).json({ calendar: calendarEntries });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving calendar entries", error });
  }
});

module.exports = router;