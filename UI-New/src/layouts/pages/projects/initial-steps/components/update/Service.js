import axiosInstance from "config/https";

async function Service(stepName,stepOrder,isCompulsory,isAbleToAddProduct, itemId) {
  const token = localStorage.getItem("token");
  const status = true;
  const order = stepOrder["value"];
  const compulsory = isCompulsory["value"];
const addProduct= isAbleToAddProduct["value"];
  try {
    const response = await axiosInstance.put(
      "/_v1/project/projectInitialSteps/update",
      {
        stepName : stepName,
        stepOrder: order,
        isCompulsory:compulsory,
        isAbleToAddProduct:addProduct,
        id: itemId,
        status:status
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
    console.error("Error updating data:", error);
    throw error;
  }
}

export default Service;
