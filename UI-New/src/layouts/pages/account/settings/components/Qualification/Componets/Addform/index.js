import { Grid, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axiosInstance from "config/https";

// eslint-disable-next-line react/prop-types
function Addform({ setshow, fetchData }) {
    const token = localStorage.getItem("token");
    const { id } = useParams();
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
                setshow(true);
                addToast("Document Upload successfully", { appearance: "success" });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
        }
    };


    return <div>
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
}

export default Addform;