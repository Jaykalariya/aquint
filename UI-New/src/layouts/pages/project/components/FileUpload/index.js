import {
  Box,
  Button,
  Card,
  Icon,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FilePdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { useEffect, useRef, useState } from "react";
import {
  ArrowBackSharp,
  ArrowRightAlt,
  ChevronRight,
  Delete,
  GetApp,
  Visibility,
} from "@mui/icons-material";
import Nodata from "components/Nodata";
import axiosInstance from "config/https";
import { useParams } from "react-router-dom";
import BirthdateFormatter from "examples/BirthdateFormatter";

import PropTypes from "prop-types";
import Swal from "sweetalert2";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");

function FileUpload() {
  const { id, stepOrder, stepId } = useParams();
  const [steps, setSteps] = useState([]);
  const [stepIds, setstepIds] = useState([]);
  const [currentStep, setCurrentStep] = useState(stepOrder - 1);
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    handleFileUpload();
    fetchStages();
  }, [selectedFile]);

  const fetchStages = async () => {
    try {
      const result = await axiosInstance.get("/_v1/project/projectInitialSteps/getAllActive", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const existingArray = [];
      const newStepNames = result.data.map((step) => step.stepName);

      const updatedArray = [...existingArray, ...newStepNames];
      console.log(updatedArray);
      setSteps(updatedArray);
      setstepIds(result.data.map((step) => step.id));
      console.log(
        "stepIds",
        result.data.map((step) => step.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async () => {
    console.log("HandleFileUpload func");
    if (!selectedFile) {
      console.log("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    // Convert the projectIdAndStepIdDto object to a JSON string
    const projectIdAndStepIdDto = {
      projectId: id,
      stepId: stepIds[currentStep],
    };
    // Convert the JSON string to a blob and append it to the FormData
    const jsonBlob = new Blob([JSON.stringify(projectIdAndStepIdDto)], {
      type: "application/json",
    });
    formData.append("projectIdAndStepIdDto", jsonBlob);
    try {
      const response = await axiosInstance.post(`/_v1/project/upload/file`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Specify the content type for the form data
        },
      });
      console.log("Upload response:", response.data);
      setSelectedFile(null);
      Swal.fire("Done!", "File uploaded", "success");
      fetchDocument();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [currentStep]);

  const fetchDocument = async () => {
    console.log("stepid", stepId);
    console.log("current step", currentStep);
    try {
      const responseForList = await axiosInstance.post(
        "/_v1/project/allDocuments",
        {
          projectId: id,
          stepId: stepIds[currentStep] || parseInt(stepId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setfilelist(responseForList.data);
      console.log(responseForList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = (currentStep) => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = (currentStep) => {
    setCurrentStep(currentStep - 1);
  };

  const FileListItem = ({ extension }) => {
    if (!extension) return null;
    let icon;

    switch (extension.toLowerCase()) {
      case "pdf":
        icon = <Icon component={FilePdfIcon} sx={{ fontSize: 40 }} />;
        break;
      case "jpg":
        icon = <Icon component={ImageIcon} sx={{ fontSize: 40 }} />;
        break;
      case "jpeg":
        icon = <Icon component={ImageIcon} sx={{ fontSize: 40 }} />;
        break;
      case "png":
        icon = <Icon component={ImageIcon} sx={{ fontSize: 40 }} />;
        break;
      case "txt":
        icon = <Icon component={DescriptionIcon} sx={{ fontSize: 40 }} />;
        break;
      default:
        icon = <Icon component={InsertDriveFileIcon} sx={{ fontSize: 40 }} />;
    }

    return icon;
  };

  FileListItem.propTypes = {
    extension: PropTypes.string.isRequired,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("Selected File:", file);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getFileUrl = (file) => {
    return `${file.documenturl}`;
  };

  const onView = (file) => {
    openFileInNewTab(file);
  };

  const openFileInNewTab = (file) => {
    const fileUrl = getFileUrl(file);

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      console.error("Unsupported file type or error in opening file.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
      <div style={{ width: "100%" }}>
        <h1 className="border-b"
          style={{
            width:"350px",
            marginLeft: "20px",
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
            // textDecoration: "underline",
            
          }}
        >
           Project Documents
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "end",
            height: "0.5vh",
          }}
        >
          <SoftBox className="flex justify-end mr-5">
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
              ref={fileInputRef}
            />
            <SoftButton color="info" onClick={() => fileInputRef.current?.click()}>
              Upload Your file
            </SoftButton>
          </SoftBox>
        </div>
      </div>

      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        sx={{
          "& .MuiStepConnector-lineVertical": {
            display: "block",
            borderLeftStyle: "solid",
            borderWidth: "0px !important",
            minHeight: "6px",
          },
        }}
      >
        {steps?.map((step, index) => (
          <Step key={step}>
            <StepLabel>
              <SoftTypography
                fontWeight="bold"
                textTransform="none"
                color="dark"
                // style={{ textDecoration: "underline"}}
              >
                {step}
              </SoftTypography>
            </StepLabel>
            <StepContent>
              {/* <Typography>{step.description}</Typography> */}
              {/* <div className="flex justify-between">
                <SoftBox mt={2}>
                  <SoftTypography
                    style={{ textDecoration: "underline" }}
                    fontWeight=""
                    mt={2}
                    textTransform="capitalize"
                  >
                    <InsertDriveFileIcon fontSize="medium" />
                    Files :-
                  </SoftTypography>
                </SoftBox>
              </div> */}
              <Card>
              <div
                style={{
                  flex: 1,
                  display: "flex justify-start",
                  flexDirection: "column",
                  minHeight: "10vh",
                }}
              >
                {Filelist.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <div
                      className="p-4 rounded-md"
                      style={{ marginBottom: "30px", maxHeight: "600px", width: "100%" }}
                    >
                      <div style={{ marginTop: "15px", marginLeft: "5px" }}>
                        <span>No Files Uploaded</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex overflow-y-auto">
                    <div
                      className=" p-4 rounded-md w-screen overflow-y-auto"
                      style={{ maxHeight: "400px" }}
                    >
                      <ul className="divide-y divide-gray-200 border-b">
                        {Filelist.map((file, index) => (
                          <li key={index} className="py-2 flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                              <div className="my-auto">
                                <FileListItem extension={file.extension} />
                              </div>
                              <div>
                                <span style={{color:""}} className="text-lg ">{file.documentname}</span>
                                <p className="text-sm text-gray-500">
                                  {file.createdby} - {formatDateTime(file.createdon)}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <button
                                onClick={() => onView(file)}
                                className="text-blue-500 hover:text-blue-700 mr-2"
                              >
                                <Visibility />
                              </button>
                              <button
                                // onClick={() => onDownload(file)}
                                className="text-green-500 hover:text-green-700 mr-2"
                              >
                                <GetApp />
                              </button>
                              <button
                                // onClick={() => showAlert(file.documentId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Delete />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
              </div>
              </Card>
              {currentStep > 0 && (
                  <SoftButton
                    onClick={() => handleBack(currentStep)}
                    variant="gradient"
                    sx={{
                      fontSize: "12px",
                      padding: "8px 16px",
                      marginRight: "20px",
                      marginTop: "30px",
                      marginBottom: "30px",
                      // marginLeft:"5px"
                    }}
                  >
                    Back <ArrowBackSharp style={{ fontSize: "60px", marginLeft: "8px" }} />
                  </SoftButton>
                )}
                {currentStep < steps.length - 1 && (
                  <SoftButton
                    onClick={() => handleNext(currentStep)}
                    variant="gradient"
                    color="primary"
                    sx={{
                      fontSize: "12px",
                      padding: "8px 16px",
                      marginRight: "12px",
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    Next <ArrowRightAlt style={{ fontSize: "60px", marginLeft: "8px" }} />
                  </SoftButton>
                )}
              
            </StepContent>
          </Step>
        ))}
      </Stepper>
      </Card>
      
    </DashboardLayout>
  );
}

export default FileUpload;
