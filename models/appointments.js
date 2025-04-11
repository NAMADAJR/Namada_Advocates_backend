const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  Advocate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Advocate" },
  reason: String,
  date: Date
});

module.exports = mongoose.model("Appointment", appointmentSchema);