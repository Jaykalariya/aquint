import axiosInstance from "config/https";
async function Service(firstname, middlename, lastname, username, email, role) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is missing or invalid");
    return;
  }
  try {
    const response = await axiosInstance.post(
      "/_v1/user/addUser",
      { firstname, middlename, lastname, username, email, role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error sending data:");
  }
}
export default Service;
