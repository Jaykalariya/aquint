import axiosInstance from "config/https";

async function Service(stateName,stateCode, status, itemId) {
  const token = localStorage.getItem("token");
 
  try {
    const response = await axiosInstance.post(
      "/_v1/placeOfSupply/addPlaceOfSupply",
      {
        stateName,
        stateCode,
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
