import { useEffect, useState } from "react";
import "../App.css";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [hotels, setHotels] = useState([]);
const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/hotels")
        .then((response) => setHotels(response.data))
        .catch((error) =>
            console.error(error)
        );
}, []);

  return (
    <>
  

  <div className="container my-5">
    <h1 className="text-center mb-5">
      Find Your Perfect Stay
    </h1>
    <div className="row justify-content-center mb-5">
  <div className="col-md-6">
    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Search hotels..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

      <div className="row">
        {hotels
  .filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((hotel) => (
          <div className="col-md-4 mb-4" key={hotel._id}>
            <div className="card shadow h-100">

              <img
                src={hotel.image}
                className="card-img-top"
                alt={hotel.name}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">

                <h3 className="card-title">
                  {hotel.name}
                </h3>

                <p className="text-muted">
                  📍 {hotel.location}
                </p>

                <p>
                  {hotel.description}
                </p>

                <h5 className="text-success">
                  ₹{hotel.pricePerNight} / night
                </h5>

                <div className="mt-3 mb-3">
                  {hotel.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="badge bg-primary me-2 mb-2"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
                  <Link to={`/hotel/${hotel._id}`} className="btn btn-success w-100 mt-auto">View Rooms</Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      </div>
</>
  );
}

export default Home;