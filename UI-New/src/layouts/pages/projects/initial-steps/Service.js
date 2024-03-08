import axiosInstance from "config/https";

async function Service(stepName,stepOrder,isCompulsory,isAbleToAddProduct) {
  const token = localStorage.getItem("token");
  const status = true;
  const order = stepOrder["value"];
  const compulsory = isCompulsory["value"];
const addProduct= isAbleToAddProduct["value"];

  try {
    const response = await axiosInstance.post(
      "/_v1/project/projectInitialSteps/add",
      {
        stepName : stepName,
        stepOrder: order,
        isCompulsory:compulsory,
        isAbleToAddProduct:addProduct,
        status:status
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
