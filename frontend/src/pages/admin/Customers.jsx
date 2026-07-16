import { useEffect, useState } from "react";
import API from "../../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingCounts, setBookingCounts] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {

        API.get("/bookings")
            .then((response) => {

                const uniqueCustomers = [];
const counts = {};
const emails = new Set();

response.data.forEach((booking) => {

    const email = booking.customer.email;

    counts[email] = (counts[email] || 0) + 1;

    if (!emails.has(email)) {
        emails.add(email);
        uniqueCustomers.push(booking.customer);
    }

});
                setCustomers(uniqueCustomers);
                setBookingCounts(counts);

            })
            .catch((err)=>{
                console.error(err);
                setError("Failed to load customers.")})
            .finally(() => setLoading(false));

    }, []);
    

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
                Loading customers...
            </p>

        </div>
    );
}
if (error) {
    return (
        <div className="container mt-5">
            <div className="alert alert-danger">
                {error}
            </div>
        </div>
    );
}

if (customers.length === 0) {
    return (
        <div className="container text-center mt-5">

            <h2>No Customers Found</h2>

            <p className="text-muted">
                Customers will appear after bookings are made.
            </p>

        </div>
    );
}

return (

    <div className="container mt-5">

        <h2 className="text-center mb-4">
            👥 Customer Management
        </h2>

        <p className="text-muted mb-4">
            Total Customers : <strong>{customers.length}</strong>
        </p>

        <div className="table-responsive">

            <table className="table table-bordered table-hover shadow text-center align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Total Bookings</th>
                    </tr>

                </thead>

                <tbody>

                    {[...customers]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((customer, index) => (

                        <tr key={customer.email}>

                            <td>{index + 1}</td>

                            <td className="fw-semibold">
                                {customer.name}
                            </td>

                            <td>{customer.email}</td>

                            <td>{customer.phone || "-"}</td>
                            <td>
    <span className="badge rounded-pill bg-primary fs-6 px-3 py-2">
        {bookingCounts[customer.email]}
    </span>
</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>

);
}

export default Customers;