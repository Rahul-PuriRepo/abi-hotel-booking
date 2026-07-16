import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Bookings.css";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");

    useEffect(() => {

        API.get("/bookings")
            .then((response) => {
                setBookings(response.data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });

    }, []);

    const deleteBooking = async (id) => {

    if (!window.confirm("Delete this booking?")) {
        return;
    }

    try {

        await API.delete(`/bookings/${id}`);

        setBookings((prev) =>
            prev.filter((booking) => booking._id !== id)
        );

        setSuccess("Booking deleted successfully!");

        setTimeout(() => {
            setSuccess("");
        }, 3000);

    } catch (error) {

        alert("Failed to delete booking.");

        console.error(error);

    }

};

    if (loading) {
    return (
        <div className="container text-center mt-5">
            

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
        <div className="container text-center mt-5">

            <h2>No Bookings Found</h2>

            <p className="text-muted">
                There are no bookings yet.
            </p>

        </div>
    );
}

    return (

    <div className="container mt-5">
        {success && (
    <div className="alert alert-success shadow-sm">
        {success}
    </div>
)}
        <h2 className="text-center mb-4">
            📅 Booking Management
        </h2>
        <p className="text-muted mb-4">
    Total Bookings : <strong>{bookings.length}</strong>
</p>
<div className="table-responsive">
        <table className="table table-bordered table-hover shadow text-center align-middle">

            <thead className="table-dark">

                <tr>

                    <th>Hotel</th>
                    <th>Room</th>
                    <th>Customer</th>
                    <th>Booking ID</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Guests</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

    {[...bookings]
    .sort(
        (a, b) =>
            new Date(b.checkIn) -
            new Date(a.checkIn)
    )
    .map((booking) => (

        <tr key={booking._id}>

            <td className="fw-semibold">
    {booking.roomId.hotelId.name}
</td>

            <td>
                {booking.roomId.roomType}
            </td>

            <td className="fw-semibold">
    {booking.customer.name}
</td>
<td>
    <code>#{booking._id.slice(-6)}</code>
</td>
            <td>
                {new Date(booking.checkIn).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            <td>
                {new Date(booking.checkOut).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            <td>
    👥 {booking.guests}
</td>

            <td>
                <span className="fw-bold text-success">
    ₹{booking.bookedPrice.toLocaleString("en-IN")}
</span>
            </td>

            <td>

                <span
                    className={`badge ${
                        booking.paymentStatus === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                    }`}
                >
                    💳 {booking.paymentStatus}
                </span>

            </td>

            <td>

                <span
                    className={`badge ${
                        booking.bookingStatus === "Confirmed"
                            ? "bg-primary"
                            : "bg-secondary"
                    }`}
                >
                    ✅ {booking.bookingStatus}
                </span>

            </td>

            <td>

                <button className="btn btn-outline-danger btn-sm"
    onClick={() => deleteBooking(booking._id)}
>
    🗑️ Delete
</button>

            </td>

        </tr>

    ))}

</tbody>

        </table></div>

    </div>

);

}

export default Bookings;