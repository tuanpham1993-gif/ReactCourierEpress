import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",// địa chỉ cơ sở của API backend
});

api.interceptors.request.use((config) => {// interceptor để tự động thêm token vào header của mỗi request
  const token = localStorage.getItem("token");

  if (token) {// nếu token tồn tại trong localStorage, thêm nó vào header Authorization dưới dạng Bearer token
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

export default api;