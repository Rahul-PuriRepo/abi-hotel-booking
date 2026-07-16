import { useEffect, useState } from "react";
import API from "../../services/api";
const initialRoom = {
    roomNumber: "",
    roomType: "",
    price: "",
    capacity: "",
    hotelId: "",
    status: "Available",
    description: "",
    images: "",
};
function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [newRoom, setNewRoom] = useState(initialRoom);
    const [success, setSuccess] = useState("");
    const [editingRoom, setEditingRoom] = useState(null);
    

    useEffect(() => {

    API.get("/rooms")
        .then((response) => {
            setRooms(response.data);
        })
        .catch(console.error);

    API.get("/hotels")
        .then((response) => {
            setHotels(response.data);
        })
        .catch(console.error);

}, []);

    const deleteRoom = async (id) => {

    if (!window.confirm("Delete this room?")) return;

    try {

        await API.delete(`/rooms/${id}`);

        setRooms((prev) =>
            prev.filter((room) => room._id !== id)
        );

        setSuccess("Room deleted successfully!");

setTimeout(() => {
    setSuccess("");
}, 3000);

    } catch (err) {
    alert("Failed to delete room.");
    console.error(err);
}

};

const saveRoom = async () => {

    try {
        if (
    !newRoom.roomNumber ||
    !newRoom.roomType ||
    !newRoom.hotelId
) {
    alert("Please fill all required fields.");
    return;
}

if (editingRoom) {

    const response = await API.put(
        `/rooms/${editingRoom._id}`,
        {
            ...newRoom,
            images: [newRoom.images],
        }
    );

    setRooms((prev) =>
        prev.map((room) =>
            room._id === editingRoom._id
                ? response.data
                : room
        )
    );

    setSuccess("Room updated successfully!");

} else {

    const response = await API.post("/rooms", {
        ...newRoom,
        images: [newRoom.images],
    });

    setRooms((prev) => [...prev, response.data]);

    setSuccess("Room added successfully!");
}

// Runs after BOTH add and edit succeed
setEditingRoom(null);
setShowModal(false);
setNewRoom(initialRoom);

setTimeout(() => {
    setSuccess("");
}, 3000);
    }
 catch (error) {
    alert(
        error.response?.data?.message ||
        "Failed to save room."
    );

    console.error(error);
}

};

    return (

        <div className="container mt-5">
            {success && (
    <div className="alert alert-success">
        {success}
    </div>
)}

            <h2 className="text-center mb-4">
                Manage Rooms
            </h2>

            <button
    className="btn btn-success mb-4"
    onClick={() => {
    setEditingRoom(null);
    setNewRoom(initialRoom);
    setShowModal(true);
}}
>
    + Add Room
</button>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>
                        <th>Room No.</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {rooms.map((room) => (

                        <tr key={room._id}>

                            <td>{room.roomNumber}</td>

                            <td>{room.roomType}</td>

                            <td>₹{room.price}</td>

                            <td>{room.capacity}</td>

                            <td>
    <span
        className={`badge ${
            room.status === "Available"
                ? "bg-success"
                : room.status === "Occupied"
                ? "bg-danger"
                : "bg-warning text-dark"
        }`}
    >
        {room.status}
    </span>
</td>

                            <td>

                               <button
    className="btn btn-primary btn-sm me-2"
    onClick={() => {

        setEditingRoom(room);

        setNewRoom({
            ...room,
            images: room.images[0],
        });

        setShowModal(true);

    }}
>
    Edit
</button>

                                <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteRoom(room._id)}
>
    Delete
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            {showModal && (
<div
    className="modal fade show"
    style={{
        display: "block",
        background: "rgba(0,0,0,0.5)",
    }}
>
<div className="modal-dialog modal-lg">

<div className="modal-content">

<div className="modal-header">

<h5>
    {editingRoom ? "Edit Room" : "Add Room"}
</h5>

<button
    className="btn-close"
    onClick={() => {

    setShowModal(false);
setEditingRoom(null);
setNewRoom(initialRoom);
}}
></button>



</div>

<div className="modal-body">
<label className="form-label">
Room Number
</label>
<input
    className="form-control mb-3"
    placeholder="Room Number"
    value={newRoom.roomNumber}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            roomNumber:e.target.value
        })
    }
/>

<label className="form-label">
Room Type
</label>
<input
    className="form-control mb-3"
    placeholder="Room Type"
    value={newRoom.roomType}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            roomType:e.target.value
        })
    }
/>
<label className="form-label">
Price
</label>
<input
    type="number"
    className="form-control mb-3"
    placeholder="Price"
    value={newRoom.price}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            price:e.target.value
        })
    }
/>

<label className="form-label">
Capacity
</label>
<input
    type="number"
    className="form-control mb-3"
    placeholder="Capacity"
    value={newRoom.capacity}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            capacity:e.target.value
        })
    }
/>

<label className="form-label">Status</label>
<select
    className="form-select mb-3"
    value={newRoom.status}
    onChange={(e) =>
        setNewRoom({
            ...newRoom,
            status: e.target.value,
        })
    }
>

<option value="Available">
Available
</option>

<option value="Occupied">
Occupied
</option>

<option value="Maintenance">
Maintenance
</option>

</select>

<select
    className="form-select mb-3"
    value={newRoom.hotelId}
    onChange={(e) =>
        setNewRoom({
            ...newRoom,
            hotelId: e.target.value,
        })
    }
>
<label className="form-label">Hotel</label>
<option value="">
Select Hotel
</option>

{hotels.map((hotel) => (

<option
    key={hotel._id}
    value={hotel._id}
>

{hotel.name}

</option>

))}

</select>
<label className="form-label">Descriotion</label>
<textarea
    className="form-control mb-3"
    placeholder="Description"
    value={newRoom.description}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            description:e.target.value
        })
    }
/>

<input
    className="form-control"
    placeholder="Image URL"
    value={newRoom.images}
    onChange={(e)=>
        setNewRoom({
            ...newRoom,
            images:e.target.value
        })
    }
/>

</div>

<div className="modal-footer">

<button
    className="btn btn-secondary"
    onClick={() => {

    setShowModal(false);
setEditingRoom(null);
setNewRoom(initialRoom);}}
>
Cancel
</button>

<button
    className="btn btn-success"
    onClick={saveRoom}
>
    {editingRoom ? "Update Room" : "Save Room"}
</button>

</div>

</div>

</div>

</div>
)}

        </div>

    );

}

export default Rooms;