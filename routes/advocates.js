const express = require("express");
const router = express.Router();
const Advocate = require("../models/advocate"); 

// CREATE an Advocate
router.post("/", async (req, res) => {
  try {
    const newAdvocate = new Advocate(req.body);
    await newAdvocate.save();
    res.status(201).json({ message: "Advocate added successfully", advocate: newAdvocate });
  } catch (error) {
    res.status(500).json({ message: "Error creating advocate", error });
  }
});

// GET All Advocates
router.get("/", async (req, res) => {
  try {
    const advocates = await Advocate.find();
    res.json({ advocates });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving advocates", error });
  }
});

module.exports = router;
