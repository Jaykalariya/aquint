import axiosInstance from "config/https";

async function Service(formData) {
  const token = localStorage.getItem("token");
  const codeArray = formData.assignedUsers.map((item) => item.value);
  const data = {
    projectName: formData.projectName,
    projectDisplayName: formData.projectDisplayName,
    tenderStage: formData.tenderStage.value,
    tenderType: formData.tenderType.value,
    projectValue: formData.projectValue,
    submissionDate: formData.submissionDate,
    emdExemption: formData.emdExemption ,
    emdAmount: formData.emdAmount,
    tenderFeeExemption: formData.tenderFeeExemption,
    tenderFee: formData.tenderFee,
    location: formData.location,
    assignedUsers: codeArray,
  };
  try {
    const response = await axiosInstance.post("/_v1/tender/addNewTender", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

export default Service;
