const Booking = require("../models/Booking");
const Room = require("../models/Room");


const populateRoom = {
    path: "roomId",
    populate: {
        path: "hotelId",
    },
};
const createBooking = async (req, res) => {

    try {
        const {
            roomId,
            customer,
            checkIn,
            checkOut,
            guests,
            paymentMethod,
        } = req.body;

        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).json({
                    message: "Check-out must be after check-in.",
            });
        }
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        if (guests > room.capacity) {
            return res.status(400).json({
                message: "Guest count exceeds room capacity.",
            });
        }
        
        const existingBooking = await Booking.findOne({
            roomId,
            bookingStatus: "Confirmed",

            checkIn: {
                $lt: checkOut,
            },

            checkOut: {
                $gt: checkIn,
            },
        });

    

        if (existingBooking) {
            return res.status(409).json({
                message: "Room is already booked for the selected dates.",
            });
        }
        const booking = await Booking.create({
                    roomId,
                    customer,
                    checkIn,
                    checkOut,
                    guests,
                    bookedPrice: room.price,
                    paymentMethod,
            });

        const populatedBooking = await Booking.findById(booking._id)
    .populate(populateRoom);

res.status(201).json(populatedBooking);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message,
        });
    }
};


const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
    .populate(populateRoom);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

const getBookingById = async (req, res) => {

    try {

    const { id } = req.params;

    const booking = await Booking.findById(id).populate(populateRoom);
        if(!booking)
        {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

    
    res.status(200).json(booking);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to fetch booking",
            error: error.message,
    });

    }
};


const updateBooking = async (req, res) => {

    try {

    const { id } = req.params;
    const updatedData=req.body;
    delete updatedData.bookedPrice;
    delete updatedData.paymentStatus;
    delete updatedData.transactionId;
    delete updatedData.customer;

    const booking = await Booking.findByIdAndUpdate(id, updatedData,
      {
        new: true,          
        runValidators: true
      });
        if(!booking)
        {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

    const populatedBooking = await Booking.findById(booking._id)
    .populate(populateRoom);
    res.status(200).json(populatedBooking);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to update the booking",
            error: error.message,
    });

    }
};


const deleteBooking = async (req, res) => {

    try {

    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);
        if(!booking)
        {
            return res.status(404).json({
                message: "booking not found"
            });
        }

    
    res.status(200).json(booking);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to delete booking",
            error: error.message,
    });

    }
};

const payBooking = async (req, res) => {
    try {

        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        booking.paymentStatus = "Paid";
        booking.bookingStatus = "Confirmed";
        booking.transactionId = "TXN" + Date.now();

        await booking.save();

const updatedBooking = await Booking.findById(booking._id)
    .populate(populateRoom);

res.status(200).json(updatedBooking);

    } catch (error) {

        res.status(500).json({
            message: "Payment failed",
            error: error.message,
        });

    }
};



module.exports = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    payBooking,
};