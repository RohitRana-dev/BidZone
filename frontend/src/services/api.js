import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export default api;