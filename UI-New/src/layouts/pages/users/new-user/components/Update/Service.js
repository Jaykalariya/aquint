import axiosInstance from "config/https";

async function Service(firstname, middlename, lastname, username, email, role) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is missing or invalid");
    return false;
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

    if (response.status === 200) {
      return true;
    } else {
      console.error("Error adding user. Unexpected response:", response);
      return false;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

export default Service;
