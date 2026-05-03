import api from "./api";

export const login = (data) => api.post("/login", data);// gửi yêu cầu POST đến endpoint /login với data làm payload

export const register = (data) => api.post("/register", data);

export const getProfile = () => api.get("/me"); // 🔥

export const updateProfile = (data) => api.put("/me", data); // 🔥