import axiosInstance from "config/https";

async function Service(name,code,id) {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      "/_v1/project/productType/add",
      {
        productTypeName : name,
        code:code,
        projectId : id
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
