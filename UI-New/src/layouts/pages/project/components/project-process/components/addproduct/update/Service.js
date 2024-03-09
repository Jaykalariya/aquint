
import axiosInstance from "config/https";

async function Service(id,projectId, productTypeId,itemCode,itemQuantity,unitId,unitRate,basicValue,esclType,esclPercentage,gstSlabsId,amount,withGst,biddingUnit) {
  const token = localStorage.getItem("token");
  const productType = productTypeId["value"];
  const unit = unitId["value"];
  const escl = esclType["value"];
  const gstSlab = gstSlabsId["value"];
  const gst = withGst["value"];

  try {
    const response = await axiosInstance.post(
      "/_v1/project/product/add",
      {
        id:id,
        projectId : projectId,
        productTypeId:productType,
        itemCode:itemCode,
        itemQuantity:itemQuantity,
        unitId:unit,
        unitRate:unitRate,
        basicValue:basicValue,
        esclType:escl,
        esclPercentage:esclPercentage,
        gstSlabsId:gstSlab,
        amount:amount,
        withGst:gst,
        biddingUnit:biddingUnit
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
