const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");

// CREATE a Review
router.post("/", async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
});

// GET all Reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json({ reviews });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving reviews", error });
    }
});

module.exports = router;