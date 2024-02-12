import axiosInstance from "config/https";

async function Service(tenderStageName, color, stageValue, status, itemId) {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      "/_v1/tender/stage/addTenderStage",
      {
        tenderStageName,
        status: status,
        color: color,
        stageValue: stageValue,
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
