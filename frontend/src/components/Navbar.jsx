import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <Link
          to="/"
          className="navbar-brand"
        >
          🏨 ABI Hotel Booking
        </Link>

        <div>

          <Link
            to="/"
            className="btn btn-outline-light me-2"
          >
            Home
          </Link>

          <Link
            to="/my-bookings"
            className="btn btn-success"
          >
            My Bookings
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;