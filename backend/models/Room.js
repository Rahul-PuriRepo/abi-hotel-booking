const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    roomType: {
      type: String,
      enum: ["Deluxe", "Suite", "Family", "Executive"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Available", "Booked"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;