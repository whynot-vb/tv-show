import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/auth",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const register = (newUser) => API.post("/register", newUser);
export const login = (existingUser) => API.post("/login", existingUser);
export const addShowToFavorites = (showId) =>
  API.patch("/addShowToFavorites", showId);
export const removeShowFromFavorites = (showId) =>
  API.patch("/removeShowFromFavorites", showId);
