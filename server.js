const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Namada & Co Advocates API is running!");
});

// Imports Routes
const advocateRoutes = require("./routes/advocates");
const clientRoutes = require("./routes/clients");
const appointmentRoutes = require("./routes/appointments");
const calendarRoutes = require("./routes/calendar");
const reviewRoutes = require("./routes/reviews");

// Uses Routes
app.use("/advocates", advocateRoutes);
app.use("/clients", clientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/calendar", calendarRoutes);
app.use("/reviews", reviewRoutes);


const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

