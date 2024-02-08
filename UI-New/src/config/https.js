import axios from "axios";


const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://65.0.86.93:8080",
=======
  baseURL: "http://localhost:8080",
  // headers: {
  //   'Content-Type': 'application/json',
  // },
>>>>>>> 1287c121506ba561e96aa9cc7a9f3cc56abc3ce1
 
});

export default axiosInstance;