import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function BookingConfirmation() {

    const { state } = useLocation();

    const booking = state?.booking;

    if (!booking) {
        return (
            <div className="container mt-5">
                <h2>No booking found.</h2>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="alert alert-success text-center">
                <h2>🎉 Booking Confirmed!</h2>
                <p>Your payment was successful. We look forward to hosting you.</p>
                
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow p-4 text-center">

                <h3 className="mb-4">
                    Booking Details
                </h3>

                <p>
                    <strong>Booking ID:</strong> #{booking._id.slice(-8)}
                </p>

                <p>
                    <strong>Customer:</strong> {booking.customer.name}
                </p>

                <p>
                    <strong>Email:</strong> {booking.customer.email}
                </p>

                <p>
                    <strong>Phone:</strong> {booking.customer.phone}
                </p>

                <p>
                    <strong>Check In:</strong> {new Date(booking.checkIn).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
})}
                </p>

                <p>
                    <strong>Check Out:</strong> {new Date(booking.checkOut).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
})}
                </p>

                <p>
                    <strong>Guests:</strong> {booking.guests}
                </p>

                <p>
                    <strong>Amount Paid:</strong> ₹{booking.bookedPrice}
                </p>

                <p>
                    <strong>Payment Method:</strong> {booking.paymentMethod}
                </p>

                <p>
                    <strong>Payment Status:</strong> {booking.paymentStatus}
                </p>
                <p>
                    <strong>Transaction ID:</strong>{" "}
{booking.transactionId
    ? booking.transactionId.replace("TXN", "TXN-")
    : "N/A"}
                </p>
                <p>
                    <strong>Booking Status:</strong> {booking.bookingStatus}
                </p>

                <hr />

<div className="d-flex justify-content-center gap-3 mt-4">

    <Link
        to="/"
        className="btn btn-success"
    >
        Back to Home
    </Link>

    <Link
        to="/my-bookings"
        className="btn btn-outline-primary"
    >
        My Bookings
    </Link>

</div>

            </div>
            </div>
            </div>

        </div>
    );
}

export default BookingConfirmation;