import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import axiosInstance from "config/https";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import SoftButton from "components/SoftButton";
import { useToasts } from "react-toast-notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Bankinfo() {
  const { id } = useParams();
  const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id || defaultId;
  const [formData, setFormData] = useState({
    userId: +userId,
    aadhaarNumber: "",
    panNumber: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    drivingLicenceNumber: "",
    aadhaarUrl: "",
    panUrl: "",
    drivingLicenceUrl: "",
    accountStatementUrl: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [panUploaded, setPanUploaded] = useState(false);
  const [drivingLicenceUploaded, setDrivingLicenceUploaded] = useState(false);
  const [accountStatementUploaded, setaccountStatementUploaded] = useState(false);
  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [submitted, setSubmitted] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  useEffect(() => {
    fetchData();
  }, [userId]);
  useEffect(() => {
    const isFormChanged = !Object.keys(formData).every(
      (key) => formData[key] === initialFormData[key]
    );
    setFieldsChanged(isFormChanged);
  }, [formData, initialFormData]);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(
        `/_v1/user/personalAccountDetails/getDetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },    
        }
      );
      //   setFormData(result.data);
      console.log("account ",result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    console.log(formData);
    setSubmitted(true);
    try {
      const response = await axiosInstance.post(`/_v1/user/personalAccountDetails/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        alert("done");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  const handleAadhaarFileChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/personalAccountDetails/upload/file/${userId}`,
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
          aadhaarUrl: response.data,
        }));
        setAadhaarUploaded(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  const handlePanFileChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/personalAccountDetails/upload/file/${userId}`,
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
          panUrl: response.data,
        }));
        setPanUploaded(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  const handleDrivingLicenceFileChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/personalAccountDetails/upload/file/${userId}`,
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
          accountStatementUrl: response.data,
        }));
        setDrivingLicenceUploaded(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };
  const handleaccountstatemenChange = async (e) => {
    const formDatas = new FormData();
    formDatas.append("file", e.target.files[0]);
    try {
      const response = await axiosInstance.post(
        `/_v1/user/personalAccountDetails/upload/file/${userId}`,
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
          drivingLicenceUrl: response.data,
        }));
        setaccountStatementUploaded(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
    }
  };

  return (
    <Card id="Bank-Info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Bank Info</SoftTypography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Bank Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
            {submitted && !formData.bankName && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Bankname</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              ifsc Code<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.ifsc}
              onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
            {submitted && !formData.ifsc && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter ifsccode</span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Account Holder Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.accountHolderName}
              onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
            />
            {submitted && !formData.accountHolderName && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Please Enter AccountHolder Name
              </span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Account Number<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: parseInt(e.target.value, 10) || 0 })
              }
            />
            {submitted && !formData.accountNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Account Number</span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Aadhaar Number <span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.aadhaarNumber}
              onChange={(e) =>
                setFormData({ ...formData, aadhaarNumber: parseInt(e.target.value, 10) || 0 })
              }
            />
            {submitted && !formData.aadhaarNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Aadhaar Number</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">Aadhaar Image</label>
            <label htmlFor="aadhaar-file-input">
              <div style={{ cursor: "pointer", color: "green" }}>
                <SoftButton
                  color="info"
                  onClick={() => document.getElementById("aadhaar-file-input").click()}
                >
                  Upload
                </SoftButton>
                {aadhaarUploaded && (
                  <span className="ml-2 text-base">
                    <CheckCircleIcon /> Upload Aadhaar Image{" "}
                  </span>
                )}
              </div>
            </label>
            <input
              id="aadhaar-file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleAadhaarFileChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Pan Number<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.panNumber}
              onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
            />
            {submitted && !formData.panNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter Pan Number</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">PAN Image</label>
            <label htmlFor="pan-file-input">
              <div style={{ cursor: "pointer", color: "green" }}>
                <SoftButton
                  color="info"
                  onClick={() => document.getElementById("pan-file-input").click()}
                >
                  Upload
                </SoftButton>
                {panUploaded && (
                  <span className="ml-2 text-base">
                    <CheckCircleIcon /> Upload PAN Image
                  </span>
                )}
              </div>
            </label>
            <input
              id="pan-file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handlePanFileChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              DrivingLicence Number<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formData.drivingLicenceNumber}
              onChange={(e) => setFormData({ ...formData, drivingLicenceNumber: e.target.value })}
            />
            {submitted && !formData.drivingLicenceNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Please Enter DrivingLicence Number
              </span>
            )}
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">Driving Licence Image</label>
            <label htmlFor="driving-licence-file-input">
              <div style={{ cursor: "pointer", color: "green" }}>
                <SoftButton
                  color="info"
                  onClick={() => document.getElementById("driving-licence-file-input").click()}
                >
                  Upload
                </SoftButton>
                {drivingLicenceUploaded && (
                  <span className="ml-2 text-base">
                    <CheckCircleIcon /> Upload Driving Licence Image
                  </span>
                )}
              </div>
            </label>
            <input
              id="driving-licence-file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleDrivingLicenceFileChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">AccountStatemen Image</label>
            <label htmlFor="driving-licence-file-input">
              <div style={{ cursor: "pointer", color: "green" }}>
                <SoftButton
                  color="info"
                  onClick={() => document.getElementById("AccountStatemen-file-input").click()}
                >
                  Upload
                </SoftButton>
                {accountStatementUploaded && (
                  <span className="ml-2 text-base">
                    <CheckCircleIcon /> Upload AccountStatemen Image{" "}
                  </span>
                )}
              </div>
            </label>
            <input
              id="AccountStatemen-file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleaccountstatemenChange}
            />
          </Grid>
        </Grid>
        <div className="flex justify-end mt-4">
          {fieldsChanged && (
            <SoftButton color="info" onClick={handleSave}>
              Update
            </SoftButton>
          )}
        </div>
      </SoftBox>
    </Card>
  );
}

export default Bankinfo;
