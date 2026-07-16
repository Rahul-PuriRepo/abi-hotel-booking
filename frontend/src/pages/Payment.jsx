import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Payment() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const booking = state?.booking;

    if (!booking) {
        return <h2>No booking found.</h2>;
    }

    const handlePayment = async () => {

    try {

        const response = await API.patch(
            `/bookings/${booking._id}/pay`
        );

        navigate("/confirmation", {
            state: {
                booking: response.data,
            },
        });

    } catch (error) {

        console.error(error);

    }

};
    return (
    <div className="container mt-5">

        <div className="card shadow p-4">

            <h2 className="mb-4">
                Payment
            </h2>

            <h4>
                Booking Summary
            </h4>

            <hr />

            <p>
                <strong>Booking ID:</strong> {booking._id}
            </p>

            <p>
                <strong>Amount:</strong> ₹{booking.bookedPrice}
            </p>

            <p>
                <strong>Payment Method:</strong> {booking.paymentMethod}
            </p>

            <p>
                <strong>Status:</strong> {booking.paymentStatus}
            </p>

            <button
                className="btn btn-success w-100 mt-3"
                onClick={handlePayment}
            >
                Pay Now
            </button>

        </div>

    </div>
);
}
export default Payment;