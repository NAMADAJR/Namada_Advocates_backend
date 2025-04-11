const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: String,
  password: String
});

module.exports = mongoose.model("Client", clientSchema);