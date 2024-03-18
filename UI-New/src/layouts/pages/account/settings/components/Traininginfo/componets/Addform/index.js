/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "config/https";
import { useToasts } from "react-toast-notifications";
import SoftDatePicker from "components/SoftDatePicker";

function Addform({ fetchData, setshow }) {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const userId = id;
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    userId: userId,
    trainingName: "",
    dtrainingDescriptionesignation: "",
    startDate:new Date(),
    endDate: new Date(),
    trainingUrl: "",
  });
  const [FileUpload, setFileUpload] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/trainingDetails/upload/file/${userId}`,
        formDatas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          trainingUrl: response.data,
        }));
        setFileUpload(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed. Please try again later.", { appearance: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isEmptyField = Object.values(formData).some((value) => value === "");
    // if (isEmptyField) {
    //   addToast("Please fill in all required fields.", { appearance: "error" });
    //   return;
    // }
    try {
      const response = await axiosInstance.post("/_v1/user/trainingDetails/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        fetchData();
        setshow(true);
        addToast("Document Upload successfully", { appearance: "success" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };
  const handlestartDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: date,
    }));
  };

  const handleendDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: date,
    }));
  };

  return (
    <div>
      <SoftBox p={3}>
        <Typography variant="h5">Add Training Details</Typography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Training Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.trainingName}
              onChange={(e) => handleInputChange(e, "trainingName")}
            />
            {submitted && !formData.trainingName && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Training Name</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Training Description<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.trainingDescription}
              onChange={(e) => handleInputChange(e, "trainingDescription")}
            />
            {submitted && !formData.trainingDescription && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Please Enter Training Description
              </span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              StartDate<span style={{ color: "red" }}>*</span>
            </label>
            <SoftDatePicker value={formData.startDate} onChange={handlestartDateChange} />
            {submitted && !formData.startDate && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter StartDate</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              EndDate<span style={{ color: "red" }}>*</span>
            </label>
            <SoftDatePicker value={formData.endDate} onChange={handleendDateChange} />
            {submitted && !formData.endDate && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter EndDate</span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">Training Certificate</label>
            <label htmlFor="file-input">
              <div style={{ cursor: "pointer", color: "green" }}>
                <SoftButton
                  color="info"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload
                </SoftButton>
                {FileUpload && (
                  <span className="ml-2 my-auto text-base">
                    <CheckCircleIcon /> Upload Training Certificate
                  </span>
                )}
              </div>
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <div className="mt-4 flex justify-end">
          <SoftButton onClick={handleSubmit} color="info">
            Submit
          </SoftButton>
        </div>
      </SoftBox>
    </div>
  );
}

export default Addform;
