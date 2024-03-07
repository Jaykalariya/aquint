import axiosInstance from "config/https";

async function Service(totalPercentage,cgstPercentage,sgstPercentage,igstPercentage, itemId) {
  const token = localStorage.getItem("token");
  const status = "Active";

  try {
    const response = await axiosInstance.post(
      "/_v1/project/gstSlabs/add",
      {
        totalPercentage : totalPercentage,
        cgstPercentage:cgstPercentage,
        sgstPercentage:sgstPercentage,
        igstPercentage:igstPercentage,
        id: itemId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(Name, status, itemId);

    return true;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
}

export default Service;
