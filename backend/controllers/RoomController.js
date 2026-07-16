const Room = require("../models/Room");

const getRooms = async (req, res) => {
  try {
    const { hotelId } = req.query;

    const filter = {};

    if (hotelId) {
      filter.hotelId = hotelId;
    }

    const rooms = await Room.find(filter);

    res.status(200).json(rooms);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};

const createRoom = async (req, res) => {

    try {

    const {
  hotelId,
  roomNumber,
  roomType,
  price,
  capacity,
  description,
  images,
  status,
    } = req.body;

    const room = await Room.create({
        hotelId,
        roomNumber,
        roomType,
        price,
        capacity,
        description,
        images,
        status,
    });
    res.status(201).json(room);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to create room",
            error: error.message,
    });

    }
};
const getRoomById = async (req, res) => {

    try {

    const { id } = req.params;

    const room = await Room.findById(id);
        if(!room)
        {
            return res.status(404).json({
                message: "Room not found"
            });
        }

    
    res.status(200).json(room);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to fetch room",
            error: error.message,
    });

    }
};

const updateRoom = async (req, res) => {

    try {

    const { id } = req.params;
    const updatedData=req.body;

    const room = await Room.findByIdAndUpdate(id, updatedData,
      {
        new: true,          
        runValidators: true
      });
        if(!room)
        {
            return res.status(404).json({
                message: "Room not found"
            });
        }

    
    res.status(200).json(room);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to update the room",
            error: error.message,
    });

    }
};

const deleteRoom = async (req, res) => {

    try {

    const { id } = req.params;

    const room = await Room.findByIdAndDelete(id);
        if(!room)
        {
            return res.status(404).json({
                message: "Room not found"
            });
        }

    
    res.status(200).json(room);
   }
  catch(error)
    {
        res.status(500).json({
            message: "Failed to delete room",
            error: error.message,
    });

    }
};
module.exports = {
  getRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom
};