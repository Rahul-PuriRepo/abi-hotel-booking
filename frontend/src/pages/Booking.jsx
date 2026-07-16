import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Booking() {

    const { roomId } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

    const response = await API.post("/bookings", {
        roomId,
        customer,
        checkIn,
        checkOut,
        guests,
        paymentMethod,
    });

    setSuccess("🎉 Booking created successfully!");
    setError("");

    console.log(response.data);

    navigate("/payment", {
        state: {
            booking: response.data,
        },
    });

} catch (error) {

    setSuccess("");
    setError(error.response?.data?.message || "Booking failed");

}

};

    return (

        <div className="container mt-5">

    {success && (
    <div className="alert alert-success">
        {success}
    </div>
)}

{error && (
    <div className="alert alert-danger">
        {error}
    </div>
)}


            <h2 className="mb-4">
                Book Your Room
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={customer.name}
                    onChange={(e) =>
                        setCustomer({
                            ...customer,
                            name: e.target.value,
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={customer.email}
                    onChange={(e) =>
                        setCustomer({
                            ...customer,
                            email: e.target.value,
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Phone"
                    value={customer.phone}
                    onChange={(e) =>
                        setCustomer({
                            ...customer,
                            phone: e.target.value,
                        })
                    }
                />

                <label>Check In</label>

                <input
                    type="date"
                    className="form-control mb-3"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                />

                <label>Check Out</label>

                <input
                    type="date"
                    className="form-control mb-3"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                />

                <select
                    className="form-select mb-4"
                    value={paymentMethod}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                >
                    <option>UPI</option>
                    <option>Net Banking</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                </select>

                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Book Room
                </button>

            </form>

        </div>

    );
}

export default Booking;