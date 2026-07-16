const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {

    const totalHotels = await Hotel.countDocuments();

    const totalRooms = await Room.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const customers = await Booking.distinct("customer.email");

    const revenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$bookedPrice",
          },
        },
      },
    ]);

    res.status(200).json({
      hotels: totalHotels,
      rooms: totalRooms,
      bookings: totalBookings,
      customers: customers.length,
      revenue:
        revenue.length > 0
          ? revenue[0].totalRevenue
          : 0,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};