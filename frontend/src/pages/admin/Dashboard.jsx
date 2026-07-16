import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        API.get("/dashboard")
            .then((response) => setStats(response.data))
            .catch(console.error);

    }, []);

    if (!stats) {
    console.log("Dashboard Stats:", stats);
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

            <p className="mt-3 text-muted">
                Loading dashboard...
            </p>

        </div>
    );
}

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">
                Admin Dashboard
            </h2>

            <div className="row">

  <div className="col-md-4 mb-4">
    <div className="card dashboard-card shadow border-0 text-center p-4">
      <div style={{ fontSize: "50px" }}>🏨</div>
      <h5 className="mt-3 text-muted">Total Hotels</h5>
      <h1 className="fw-bold text-primary">
        {stats.hotels}
      </h1>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card dashboard-card shadow border-0 text-center p-4">
      <div style={{ fontSize: "50px" }}>🚪</div>
      <h5 className="mt-3 text-muted">Total Rooms</h5>
      <h1 className="fw-bold text-success">
        {stats.rooms}
      </h1>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card dashboard-card shadow border-0 text-center p-4">
      <div style={{ fontSize: "50px" }}>📅</div>
      <h5 className="mt-3 text-muted">Total Bookings</h5>
      <h1 className="fw-bold text-warning">
        {stats.bookings}
      </h1>
    </div>
  </div>

  <div className="col-md-6 mb-4">
    <div className="card dashboard-card shadow border-0 text-center p-4">
      <div style={{ fontSize: "50px" }}>👤</div>
      <h5 className="mt-3 text-muted">Total Customers</h5>
      <h1 className="fw-bold text-info">
        {stats.customers}
      </h1>
    </div>
  </div>

  <div className="col-md-6 mb-4">
    <div className="card dashboard-card shadow border-0 text-center p-4">
      <div style={{ fontSize: "50px" }}>💰</div>
      <h5 className="mt-3 text-muted">Total Revenue</h5>
      <h1 className="fw-bold text-success">
        ₹{stats.revenue.toLocaleString("en-IN")}
      </h1>
    </div>
  </div>

</div>

        </div>

    );
}

export default Dashboard;