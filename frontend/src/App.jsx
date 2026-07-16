import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import AvailableRooms from "./pages/AvailableRooms";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

import Dashboard from "./pages/admin/Dashboard";
import Rooms from "./pages/admin/Rooms";
import Bookings from "./pages/admin/Bookings";
import Customers from "./pages/admin/Customers";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/rooms" element={<AvailableRooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:roomId" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/rooms" element={<Rooms />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/customers" element={<Customers />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;