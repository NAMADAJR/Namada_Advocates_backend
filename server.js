const express = require("express");
const fs = require("fs");
const axios = require('axios');
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "data.json";

// Load data from JSON file
const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    return { advocates: [], clients: [], appointments: [], calendar: [], reviews: [] };
  }
};

// Save data to JSON file
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
};

// ✅ GET API (Check Server)
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ CREATE an Advocate
app.post("/advocates", (req, res) => {
  let data = loadData();
  const newAdvocate = { id: uuidv4(), ...req.body };
  data.advocates.push(newAdvocate);
  saveData(data);
  res.status(201).json(newAdvocate);
});

// ✅ CREATE a Client
app.post("/clients", (req, res) => {
  let data = loadData();
  const newClient = { id: uuidv4(), ...req.body };
  data.clients.push(newClient);
  saveData(data);
  res.status(201).json(newClient);
});

// ❌ CREATE an Appointment that is added to the Calendar
app.post("/appointments", (req, res) => {
    let data = loadData();
  
    if (!req.body.client_id || !req.body.Advocate_id || !req.body.reason || !req.body.date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    const newAppointment = { 
      id: uuidv4(), 
      client_id: req.body.client_id,
      Advocate_id: req.body.Advocate_id,
      reason: req.body.reason,
      date: req.body.date 
    };
  
    data.appointments.push(newAppointment);
  
    const client = data.clients.find(client => client.id === req.body.client_id);
    const clientName = client ? client.fullName : "Unknown Client";

    const newCalendarEntry = {
      Advocate_id: req.body.Advocate_id,
      clientName: clientName, 
      date: req.body.date,
      reason: req.body.reason
    };
  
    axios.post('http://localhost:5400/calendar', newCalendarEntry)
      .then(response => {
        data.appointments.push(newAppointment);
        saveData(data);
        res.status(201).json({
          message: "Appointment created and added to calendar",
          appointment: newAppointment,
          calendarEntry: newCalendarEntry
        });
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to add calendar entry", error });
      });
  });
  
// ✅ GET All Advocates
app.get("/advocates", (req, res) => {
  let data = loadData();
  res.json(data.advocates);
});

// ✅ GET All Clients
app.get("/clients", (req, res) => {
  let data = loadData();
  res.json(data.clients);
});

// ✅ GET All Appointments
app.get("/appointments", (req, res) => {
  let data = loadData();
  res.json(data.appointments);
});

// ✅ GET All Calendar Entries
app.get("/calendar", (req, res) => {
    let data = loadData();
    res.status(200).json({ calendar: data.calendar });
  });

// Start the server
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
