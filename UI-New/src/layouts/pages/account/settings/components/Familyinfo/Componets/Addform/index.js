/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftDatePicker from "components/SoftDatePicker";
import SoftInput from "components/SoftInput";
import axiosInstance from "config/https";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function Addform({ setshow, fetchData }) {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id || defaultId;
  const [formdata, setformdata] = useState({
    userId: userId,
    familyMemberName: "",
    occupation: "",
    birthDate: "",
    mobileNumber: "",
    relation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToasts();

  const handleInputChange = (e, field) => {
    let value = e.target.value;

    if (field === "mobileNumber") {
      value = value.replace(/\D/g, "");
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }
    setformdata((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleDateChange = (date) => {
    setformdata((prevFormData) => ({
      ...prevFormData,
      birthDate: date,
    }));
    console.log("Selected Date:", date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isEmptyField = Object.values(formdata).some((value) => value === "");
    if (isEmptyField) {
      addToast("Please fill in all required fields.", { appearance: "error" });
      return;
    }
    try {
      const response = await axiosInstance.post("/_v1/user/familyMemberDetails/add", formdata, {
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
      addToast("Failed. Please try again later.", { appearance: "error" });
    }
  };

  return (
    <div>
      <SoftBox p={3}>
        <Typography variant="h5">Add Family Member</Typography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Family MemberName<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              onChange={(e) => handleInputChange(e, "familyMemberName")}
              value={formdata.familyMemberName}
            />
            {submitted && !formdata.familyMemberName && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter FamilyMemberName</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              occupation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formdata.occupation}
              onChange={(e) => handleInputChange(e, "occupation")}
            />
            {submitted && !formdata.occupation && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Occupation</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              BirthDate<span style={{ color: "red" }}>*</span>
            </label>
            <SoftDatePicker onChange={handleDateChange} />
            {submitted && !formdata.birthDate && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Selecte BirthDate</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              MobileNumber<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formdata.mobileNumber}
              onChange={(e) => handleInputChange(e, "mobileNumber")}
            />
            {submitted && !formdata.mobileNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter MobileNumber</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Relation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formdata.relation}
              onChange={(e) => handleInputChange(e, "relation")}
            />
            {submitted && !formdata.relation && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Relation</span>
            )}
          </Grid>
        </Grid>
        <div className="mt-4 flex justify-end">
          <SoftButton onClick={handleSubmit} color="info">
            Save
          </SoftButton>
        </div>
      </SoftBox>
    </div>
  );
}

export default Addform;
