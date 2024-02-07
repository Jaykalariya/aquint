import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://65.0.86.93:8080",
 
});

export default axiosInstance;