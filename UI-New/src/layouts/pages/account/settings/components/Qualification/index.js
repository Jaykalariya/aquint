import { Card, Grid, TextField, Button, Typography, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import axiosInstance from "config/https";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Table from "examples/Tables/Table";

const QualificationTable = () => {
  const token = localStorage.getItem("token");
  const [qualifications, setQualifications] = useState([]);
  const { id } = useParams();
  // const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id;
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    userId: userId,
    qualificationName: "",
    universityName: "",
    percentage: "",
    passingYear: "",
    subject: "",
    qualificationDocumentUrl: "",
  });
  const [FileUpload, setFileUpload] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const columns = [
    { name: "Qualification Name", align: "left", width: "auto" },
    { name: "Board/University", align: "left", width: "auto" },
    { name: "Percentage", align: "left", width: "auto" },
    { name: "Year", align: "left", width: "auto" },
    { name: "Subject", align: "left", width: "auto" },
    { name: "Action", align: "center", width: "auto" },
  ];

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    if (field === "percentage" || field === "passingYear") {
      if (!isNaN(value)) {
        value = parseFloat(value);
      } else {
        value = "";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/qualification/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQualifications(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/qualification/upload/file/${userId}`,
        formDatas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      const qualificationDocumentUrl = response.data;
      console.log("Qualification Document URL:", qualificationDocumentUrl);
      if (response) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          qualificationDocumentUrl: qualificationDocumentUrl,
        }));
        setFileUpload(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      addToast("Please fill in all required fields.", { appearance: "error" });
      return;
    }
    try {
      const response = await axiosInstance.post("/_v1/user/qualification/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        fetchData();
        addToast("Document Upload successfully", { appearance: "success" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  function handleEdit(id) {
    console.log("id", id);
    const result = qualifications.filter((item) => item.id === id);
    if (result) {
      setFileUpload(true);
      setFormData(result[0]);
    }
    console.log("result");
  }

  return (
    <Card id="Qualification-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <Typography variant="h5">Qualification Info</Typography>
      </SoftBox>
      <div style={{ overflowX: "auto" }}>
        <SoftBox component="form">
          <div className="px-5">
            <Table
              columns={columns}
              rows={qualifications.map((qualification, index) => ({
                "Qualification Name": qualification.qualificationName,
                "Board/University": qualification.universityName,
                Percentage: qualification.percentage,
                Year: qualification.passingYear,
                Subject: qualification.subject,
                Action: (
                  <Icon onClick={() => handleEdit(qualification.id)} style={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ),
              }))}
            />
          </div>
        </SoftBox>
      </div>
      <div>
        <SoftBox p={3}>
          <Typography variant="h5">Add Qualification</Typography>
        </SoftBox>
        <SoftBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">
                Qualification Name<span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                value={formData.qualificationName}
                onChange={(e) => handleInputChange(e, "qualificationName")}
              />
              {submitted && !formData.qualificationName && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Please Enter QualificationName
                </span>
              )}
            </Grid>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">
                Board/University<span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                value={formData.universityName}
                onChange={(e) => handleInputChange(e, "universityName")}
              />
              {submitted && !formData.universityName && (
                <span style={{ color: "red", fontSize: "12px" }}>Please Enter UniversityName</span>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">
                Percentage<span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                value={formData.percentage}
                onChange={(e) => handleInputChange(e, "percentage")}
              />
              {submitted && !formData.percentage && (
                <span style={{ color: "red", fontSize: "12px" }}>Please Enter Percentage</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">
                PassingYear<span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                value={formData.passingYear}
                onChange={(e) => handleInputChange(e, "passingYear")}
              />
              {submitted && !formData.passingYear && (
                <span style={{ color: "red", fontSize: "12px" }}>Please Enter PassingYear</span>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">
                Subject<span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                value={formData.subject}
                onChange={(e) => handleInputChange(e, "subject")}
              />
              {submitted && !formData.subject && (
                <span style={{ color: "red", fontSize: "12px" }}>Please Enter Subject</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <label className="text-xs font-bold p-1">Qualification Certificate</label>
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
                      <CheckCircleIcon /> Upload Qualification Certificate
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
    </Card>
  );
};

export default QualificationTable;
