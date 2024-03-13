import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "config/https";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function Healthissue() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id || defaultId;
  const [formdata, setformdata] = useState({
    userId: userId,
    healthIssueName: "",
    healthIssueDescription: "",
  });
  const [formModified, setFormModified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { addToast } = useToasts();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/healthIssue/getDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setformdata(result.data[0]);
      console.log("formdata", result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
    setFormModified(true);
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formdata.healthIssueName.trim()) {
      errors.healthIssueName = "Health issue name is required";
    }
    if (!formdata.healthIssueDescription.trim()) {
      errors.healthIssueDescription = "Health issue description is required";
    }
    return errors;
  };

  const Save = async () => {
    setSubmitted(true);
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const result = await axiosInstance.put(`/_v1/user/healthIssue/update/${userId}`, formdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addToast("Update successful:", {
          appearance: "success",
        });

        setFormModified(false);
      } catch (error) {
        console.error("Update error:", error);
        addToast("failed. Please try again.", { appearance: "error" });
      }
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <Card id="Healthissue-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Health issue</SoftTypography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid item>
          <label className="text-xs font-bold p-1">Health-Issue Name</label>
          <SoftInput
            name="healthIssueName"
            value={formdata.healthIssueName}
            onChange={handleInputChange}
            error={!!validationErrors.healthIssueName && (formModified || submitted)}
            helperText={validationErrors.healthIssueName}
          />
          {submitted && !formdata.healthIssueName && (
            <span style={{ color: "red", fontSize: "12px" }}>Health issue Name is required</span>
          )}
        </Grid>
        <Grid item>
          <label className="text-xs font-bold p-1">Health-Issue Description</label>
          <SoftInput
            name="healthIssueDescription"
            size="large"
            multiline
            value={formdata.healthIssueDescription}
            onChange={handleInputChange}
            error={!!validationErrors.healthIssueDescription && (formModified || submitted)}
            helperText={validationErrors.healthIssueDescription}
          />
          {submitted && !formdata.healthIssueDescription && (
            <span style={{ color: "red", fontSize: "12px" }}>
              Health issue description is required
            </span>
          )}
        </Grid>
        <div className="flex justify-end mt-4">
          {formModified && (
            <SoftButton color="info" onClick={Save}>
              Update
            </SoftButton>
          )}
        </div>
      </SoftBox>
    </Card>
  );
}
export default Healthissue;
