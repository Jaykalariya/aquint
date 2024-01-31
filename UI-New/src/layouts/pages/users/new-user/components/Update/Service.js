import axiosInstance from "config/https";
async function Service(firstName,middleName,lastName,userName,email,role) {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "/_v1/placeOfSupply/addPlaceOfSupply",
      {
        firstName,
        middleName,
        lastName,
        userName,
        email,
        role
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
}
export default Service;