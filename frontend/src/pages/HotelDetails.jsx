import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((response) => setHotel(response.data))
      .catch((error) => console.error(error));

    API.get(`/rooms?hotelId=${id}`)
    .then((response) => setRooms(response.data))
    .catch(console.error);
  }, [id]);


  if (!hotel) {
  return (
    <div className="container text-center my-5">
      <div
        className="spinner-border text-success"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-3">Loading hotel details...</p>
    </div>
  );
}

  return (
    <div className="container mt-5">

      <img
    src={hotel.image}
    alt={hotel.name}
    className="img-fluid rounded mb-4"
    style={{
        width: "100%",
        height: "400px",
        objectFit: "cover",
    }}
/>

      <h1>{hotel.name}</h1>

      <p>{hotel.description}</p>

      <h4 className="text-success">
        ₹{hotel.pricePerNight} / night
      </h4>
    <hr className="my-5" />

<h2 className="text-center mb-5">
    Available Rooms
</h2>

<div className="row justify-content-center">
  {rooms.map((room) => (
    <div className="col-md-5 col-lg-4 mb-4" key={room._id}>
      <div className="card h-100 shadow">

        <img
          src={room.images[0]}
          className="card-img-top"
          alt={room.roomType}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">

          <h4>{room.roomType}</h4>

          <p>{room.description}</p>

          <p>
            Capacity: {room.capacity} Guests
          </p>

          <h5 className="text-success">
            ₹{room.price} / night
          </h5>

          <Link
    to={`/booking/${room._id}`}
    className="btn btn-primary w-100"
>
    Book Now
</Link>

        </div>

      </div>
    </div>
  ))}
</div>
    </div>
    
  );
}

export default HotelDetails;