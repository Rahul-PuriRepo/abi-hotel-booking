import axios from "axios";

const API = axios.create({
  baseURL: "https://abi-hotel-booking.onrender.com/api",
});

export default API;