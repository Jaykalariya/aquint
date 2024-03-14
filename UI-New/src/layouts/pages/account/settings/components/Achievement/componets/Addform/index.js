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
    achievementName: "",
    achievementDescription: "",
    achievementUrl: "",
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
        `/_v1/user/achievement/upload/file/${userId}`,
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
          achievementUrl: response.data,
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
      const response = await axiosInstance.post("/_v1/user/achievement/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        fetchData();
        setshow(true);
        addToast("Upload successfully", { appearance: "success" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
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
              Achievement Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.achievementName}
              onChange={(e) => handleInputChange(e, "achievementName")}
            />
            {submitted && !formData.achievementName && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Achievement Name</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Achievement Description<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.achievementDescription}
              onChange={(e) => handleInputChange(e, "achievementDescription")}
            />
            {submitted && !formData.achievementDescription && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Please Enter Achievement Description
              </span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">Achievement Certificate</label>
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
                    <CheckCircleIcon /> Upload Achievement Certificate
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
