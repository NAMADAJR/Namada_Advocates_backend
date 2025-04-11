const mongoose = require("mongoose");

const advocateSchema = new mongoose.Schema({
  fullName: String,
  isAdmin: Boolean,
  email: String,
  phoneNumber: String,
  bio: String,
  password: String,
});

module.exports = mongoose.model("Advocate", advocateSchema);
