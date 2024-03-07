import axiosInstance from "config/https";

async function Service(name,type, itemId) {
  const token = localStorage.getItem("token");
  const status = "Active";

  try {
    const response = await axiosInstance.post(
      "/_v1/project/unit/add",
      {
        unitName : name,
        unitType:type,
        id:itemId
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
