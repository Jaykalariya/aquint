import axiosInstance from "config/https";

async function Service(name) {
  const token = localStorage.getItem("token");
  const status = "Active";

  try {
    const response = await axiosInstance.post(
      "/_v1/role/createOrUpdate",
      {
        name,
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
