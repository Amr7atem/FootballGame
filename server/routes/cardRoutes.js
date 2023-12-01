const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Add a Card
router.post("/", async (req, res) => {
  try {
    const { number, answers } = req.body;
    const card = new Card({ number, answers });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all Cards
router.get("/", async (req, res) => {
  try {
    const card = await Card.find();
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:number", async (req, res) => {
  try {
    const { number } = req.params;
    const card = await Card.findOne({ number });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
