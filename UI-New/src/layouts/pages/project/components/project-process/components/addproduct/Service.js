import axiosInstance from "config/https";

async function Service(
  projectId,
  productTypeId,
  itemCode,
  itemQuantity,
  unitId,
  unitRate,
  basicValue,
  esclType,
  esclPercentage,
  gstSlabsId,
  amount,
  withGst,
  biddingUnit,
  productDescription
) {
  const token = localStorage.getItem("token");
  const productType = productTypeId["value"];
  const unit = unitId["value"];
  const escl = esclType["value"];
  const gstSlab = gstSlabsId["value"];
  const gst = withGst["value"];
  
  // console.log("projectId:", projectId);
  // console.log("productTypeId:", productType);
  // console.log("itemCode:", itemCode);
  // console.log("itemQuantity:", itemQuantity);
  // console.log("unitId:", unitId);
  // console.log("unitRate:", unitRate);
  // console.log("basicValue:", basicValue);
  // console.log("esclType:", escl);
  // console.log("esclPercentage:", esclPercentage);
  // console.log("gstSlabsId:", gstSlab);
  // console.log("amount:", amount);
  // console.log("withGst:", gst);
  // console.log("biddingUnit:", biddingUnit);
  // console.log("productDescription:", productDescription);
  // console.log("Service");
  
  try {
    console.log("test");
    console.log("unitId:", unitId);

    const response = await axiosInstance.post(
      "/_v1/project/product/add",
      {
        projectId: projectId,
        productTypeId: productType,
        itemCode: itemCode,
        itemQuantity: itemQuantity,
        unitId: unit,
        unitRate: unitRate,
        basicValue: basicValue,
        esclType: escl,
        esclPercentage: esclPercentage,
        gstSlabsId: gstSlab,
        amount: amount,
        withGst: gst,
        biddingUnit: biddingUnit,
        productDescription: productDescription,
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
