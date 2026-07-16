const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    customer: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    email: {
            type: String,
            required: true,
            trim: true,
        },
    phone: {
        type: String,
        required: true,
        trim: true,
        },
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
        type:Number,
        required:true,
        min:1
    },

    bookedPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Net Banking", "Credit Card", "Debit Card"],
      default:"UPI",
    },

    paymentStatus: {
        type:String,
        enum:["Pending","Paid","Failed","Refunded"],
        default:"Pending"
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    transactionId: {
        type: String,
        default: null
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
