import axiosInstance from "config/https";

async function Service(tenderTypeName, status) {
  const token = localStorage.getItem("token");
  console.log(status);

  try {
    const response = await axiosInstance.post(
      "/_v1/tender/type/addTenderType",
      {
        tenderTypeName,
        status: status,
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
