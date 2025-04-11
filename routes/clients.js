
const express = require("express");
const router = express.Router();
const Client = require("../models/clients");

// CREATE a Client
router.post("/", async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json({ message: "Client added successfully", client: newClient });
    } catch (error) {
        res.status(500).json({ message: "Error adding client", error });
    }
});

// GET all Clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json({ clients });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving clients", error });
    }
});

module.exports = router;