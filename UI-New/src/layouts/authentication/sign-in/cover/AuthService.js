import axiosInstance from "config/https";

const AuthService = async (username, password) => {
  try {
    const response = await axiosInstance.post("/_v1/auth/signin", {
      username,
      password,
    });

    // Assuming the server returns a JWT token upon successful login
    const token = response.data.accessToken;

    // Store the token in localStorage or session storage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default AuthService;
