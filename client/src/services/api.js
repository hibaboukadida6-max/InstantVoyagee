import axios from "axios";

const api = axios.create({
  baseURL: "https://instantvoyagee.onrender.com/api",
});

export default api;