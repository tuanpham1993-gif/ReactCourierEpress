import axios from "axios";

export const login = (data) => {
  return axios.post("http://localhost:8000/api/login", data);
};

export const register = (data) => {
  return axios.post("http://localhost:8000/api/register", data);
};
export const updateProfile = (data) => {
  return axios.put("http://localhost:8000/api/profile", data);
};

export const getProfile = (id) => {
  return axios.get(`http://localhost:8000/api/profile/${id}`);
};
