const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const hotelRoutes = require("./routes/HotelRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ABI Hotel Booking API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});