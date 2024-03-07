import { Step, StepLabel, Stepper } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useEffect, useRef, useState } from "react";
import { ArrowBackSharp, ArrowRightAlt, ChevronRight, Delete, GetApp, Visibility } from "@mui/icons-material";
import Nodata from "components/Nodata";
import axiosInstance from "config/https";
import { useParams } from "react-router-dom";
import BirthdateFormatter from "examples/BirthdateFormatter";

import PropTypes from "prop-types";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");

function FileUpload() {
  const { id, stepOrder ,stepId} = useParams();
  const [steps, setSteps] = useState([]);
  const [stepIds, setstepIds] = useState([stepId]);
  const [currentStep, setCurrentStep] = useState(stepOrder - 1);
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchStages();
  }, []);

  
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
      console.log(result.data.map((step) => step.id));
      const responseForList = await axiosInstance.post(
        "/_v1/project/allDocuments",
        {
          projectId: id,
          stepId: stepIds[currentStep],
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


  useEffect(() => {
    fetchDocument();
  },[currentStep])


  const fetchDocument = async () => {
    try {
      const responseForList = await axiosInstance.post(
        "/_v1/project/allDocuments",
        {
          projectId: id,
          stepId: stepIds[currentStep],
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



  const handleNext = (currentStep) =>{
    setCurrentStep(currentStep+1);
  }

  const handleBack = (currentStep) =>{
    setCurrentStep(currentStep-1);
  }

  // const FileListItem = ({ extension }) => {
  //   if (!extension) return null;
  //   let icon;

  //   switch (extension.toLowerCase()) {
  //     // Cases for different file extensions
  //     case "pdf":
  //       icon = <img src={pdf} alt="pdf" className="w-10 h-10" />;
  //       break;
  //     case "jpg":
  //       icon = <img src={jpg} alt="jpg" className="w-10 h-10" />;
  //       break;
  //     // Add more cases as needed

  //     default:
  //       icon = <img src={Default} alt="default" className="w-10 h-10" />;
  //   }

  //   return icon;
  // };

  // FileListItem.propTypes = {
  //   extension: PropTypes.string.isRequired,
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("Selected File:", file);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "10vh",
        }}
      >
        <SoftBox className="flex justify-end mr-5">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
            ref={fileInputRef}
          />
          <SoftButton color="info" onClick={() => fileInputRef.current.click()}>
            Upload Your file
          </SoftButton>
        </SoftBox>
      </div>
      <div className="flex justify-between">
        <SoftBox mt={2} pl={4} className="border-b">
          <SoftTypography fontWeight="bold" mt={2} textTransform="capitalize">
            File <InsertDriveFileIcon fontSize="medium" />
          </SoftTypography>
        </SoftBox>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {Filelist.length === 0 ? (
          <div className="flex justify-center items-center">
            <div
              className="p-4 rounded-md"
              style={{ maxHeight: "600px", width: "100%", backgroundColor: "white" }}
            >
              <div>
                <Nodata />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex overflow-y-auto">
            <div
              className=" p-4 rounded-md w-screen overflow-y-auto"
              style={{ maxHeight: "400px" }}
            >
              <ul className="divide-y divide-gray-200">
                {Filelist.map((file, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      {/* <div className="my-auto">
                        <FileListItem extension={file.extension} />
                      </div> */}
                      <div>
                        <span className="text-lg font-semibold">{file.documentname}</span>
                        <p className="text-sm text-gray-500">
                          {file.createdby} -{BirthdateFormatter(file.createdOn)}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        // onClick={() => onView(file)}
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
        <SoftButton onClick={() => handleNext(currentStep)} color="dark" style={{fontSize:"20px", alignSelf: "center", margin: "20px" ,width:"25%" ,height:"60px", borderRadius:"40px"}}>
        <span style={{ fontSize: "20px", textTransform: "none" }}>Next</span>
        <ArrowRightAlt style={{ fontSize: "60px", marginLeft: "8px" }} />
        </SoftButton>
        <SoftButton onClick={() => handleBack(currentStep)} color="" style={{fontSize:"20px", alignSelf: "center", margin: "20px" ,width:"25%" ,height:"60px", borderRadius:"40px"}}>
        <span style={{ fontSize: "20px", textTransform: "none" }}>Back</span>
        <ArrowBackSharp style={{ fontSize: "60px", marginLeft: "8px" }} />
        </SoftButton>
      </div>
    </DashboardLayout>
  );
}

export default FileUpload;
