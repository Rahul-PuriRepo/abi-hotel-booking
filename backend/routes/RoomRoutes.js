const express = require("express");

const router = express.Router();

const { getRooms, createRoom, getRoomById, updateRoom, deleteRoom } = require("../controllers/RoomController");

router.get("/", getRooms);

router.post("/", createRoom);

router.get("/:id", getRoomById);

router.put("/:id", updateRoom);

router.delete("/:id", deleteRoom);

module.exports = router;