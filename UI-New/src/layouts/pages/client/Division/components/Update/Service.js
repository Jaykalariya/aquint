import axiosInstance from "config/https";

async function Service(divisionName,status, itemId) {
  const token = localStorage.getItem("token");
 

  try {
    const response = await axiosInstance.post(
      "/_v1/division/addDivision",
      {
        divisionName,
        status: status,
        id: itemId,
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
