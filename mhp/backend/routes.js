const express = require("express");
const router = express.Router();
const offers = require("./data/offers.json");

// API: Fragebogen-Auswertung (Dummy)
router.post("/analyze", (req, res) => {
    const { mood } = req.body;
    const recommendation = mood === "stressed"
        ? offers.filter(offer => offer.category === "stress")
        : offers.filter(offer => offer.category === "general");
    res.json({ recommendation });
});

// API: Alle Angebote abrufen
router.get("/offers", (req, res) => {
    res.json(offers);
});

module.exports = router;
