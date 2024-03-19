import axios from "axios";
import { getCookie } from "typescript-cookie";

const BASE_URL = "http://localhost:8000/api";
const server = axios.create({ baseURL: BASE_URL });
server.interceptors.request.use((request) => {
  const token = getCookie("userToken");
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      document.location.href = "/login";
    }
  }
);
export default server;
