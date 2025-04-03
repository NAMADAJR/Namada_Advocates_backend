const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  clientName: String,
  content: String,
  stars: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model("Reviews", reviewSchema);
