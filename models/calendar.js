const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  Advocate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Advocate" },
  clientName: String,
  date: Date,
  reason: String
});

module.exports = mongoose.model("Calendar", calendarSchema);