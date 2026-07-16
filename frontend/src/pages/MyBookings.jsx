import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  API.get("/bookings")
    .then((response) => {
      setBookings(response.data);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

if (loading) {
  return (
    <div className="container text-center my-5">
      <div
        className="spinner-border text-success"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <p className="mt-3">
        Loading bookings...
      </p>
    </div>
  );
}
if (bookings.length === 0) {
  return (
    <div className="container text-center my-5">
      <h2>No Bookings Yet</h2>

      <p className="text-muted mb-4">
        Your hotel bookings will appear here.
      </p>

      <Link
        to="/"
        className="btn btn-success"
      >
        Browse Hotels
      </Link>
    </div>
  );
}

    return (

        <div className="container mt-5">

    <h2 className="text-center mb-5">
        My Bookings
    </h2>

    <div className="row">

        {bookings.map((booking) => (

            <div
                className="col-md-6 col-lg-4 mb-4"
                key={booking._id}
            >
                
                <div className="card shadow h-100">

    <img
        src={booking.roomId.hotelId.image}
        className="card-img-top"
        alt={booking.roomId.hotelId.name}
        style={{
            height: "220px",
            objectFit: "cover",
        }}
    />
<hr className="my-3" />
    <div className="card-body">

                        <h4
    style={{
        minHeight: "60px",
    }}
>
    {booking.roomId.hotelId.name}
</h4>

                       <p>
    <strong>Room:</strong> {booking.roomId.roomType}
</p>

                        <p>
    <strong>Customer:</strong> {booking.customer.name}
</p>

                        

                            <p>
    <strong>Check In:</strong>{" "}
    {new Date(booking.checkIn).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })}
</p>

                        

                        <p>
    <strong>Check Out:</strong>{" "}
    {new Date(booking.checkOut).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })}
</p>

                        <p>
    <strong>Guests:</strong> {booking.guests}
</p>

                        <h5 className="text-success fw-bold">
    ₹{booking.bookedPrice} / night
</h5>

                        <span
    className={`badge ${
        booking.paymentStatus === "Paid"
            ? "bg-success"
            : "bg-warning text-dark"
    }`}
>
    {booking.paymentStatus}
</span>

                        <span
    className={`badge ms-2 ${
        booking.bookingStatus === "Confirmed"
            ? "bg-primary"
            : "bg-secondary"
    }`}
>
    {booking.bookingStatus}
</span>
<button className="btn btn-outline-primary w-100 mt-3">
    View Details
</button>

                    </div>

                </div>

            </div>

        ))}

    </div>

</div>
    );
}

export default MyBookings;