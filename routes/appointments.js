const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointments");
const Calendar = require("../models/calendar");

// CREATE an Appointment and add to Calendar
router.post("/", async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();

        const newCalendarEntry = new Calendar({
            Advocate_id: req.body.Advocate_id,
            clientName: req.body.clientName,
            date: req.body.date,
            reason: req.body.reason
        });
        await newCalendarEntry.save();

        res.status(201).json({ message: "Appointment created and added to calendar", appointment: newAppointment, calendarEntry: newCalendarEntry });
    } catch (error) {
        res.status(500).json({ message: "Error creating appointment", error });
    }
});

// GET all Appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json({ appointments });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving appointments", error });
    }
});

module.exports = router;