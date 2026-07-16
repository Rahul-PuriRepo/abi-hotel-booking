const express = require("express");
const router = express.Router();
const {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    payBooking
} = require("../controllers/BookingController");


router.get("/", getBookings);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.patch("/:id/pay", payBooking);

module.exports = router;