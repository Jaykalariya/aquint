import axiosInstance from "config/https";

async function Service(stateName, stateCode, status) {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      "/_v1/placeOfSupply/addPlaceOfSupply",
      {
        stateName,
        stateCode,
        status
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
    // throw error;
  }
}

export default Service;
