const express = require("express");
const Hotel = require("../models/Hotel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hotels",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(hotel);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hotel",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create hotel",
      error: error.message,
    });
  }
});

module.exports = router;