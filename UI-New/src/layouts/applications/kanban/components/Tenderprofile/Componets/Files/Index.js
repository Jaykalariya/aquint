import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftDropzone from "components/SoftDropzone";
import SoftButton from "components/SoftButton";
import axiosInstance from "config/https";
import { Card } from "@mui/material";

// eslint-disable-next-line react/prop-types
const File = ({ tenderid }) => {
  const [fileData, setFileData] = useState(null);
  const token = localStorage.getItem("token");
  // const [tender, settendetdata] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axiosInstance.get(`/_v1/tender/allDocuments/${tenderid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    settendetdata(result.data);
    console.log(result.data);
  };

  const handleDrop = (files) => {
    // console.log(files);
    // const uploadedFile = files[0];
    // setFileData(uploadedFile);
  };

  const dropzoneOptions = {
    acceptedFiles: "*",
  };

  const handleFileDrop = (files) => {
    // console.log(
    //   "Files dropped:",
    //   files.map((file) => file.name)
    // );
  };

  return (
    <div className="grid grid-cols-2 h-3/4">
      <div className="container mx-auto py-4 h-3/4">
        <h1 className="text-base font-bold mb-4 text-center">File List</h1>
        <ul className="shadow-xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tender.map((file, index) => (
            <li key={index} className="p-4 flex items-center">
              {file.extension === "jpeg" && (
                <img src={file.documentUrl} alt={file.documentName} className="w-8 h-8 mr-2" />
              )}
              <div>
                <p className="text-gray-800 text-base">{file.documentName}</p>
                <p className="text-gray-600 text-sm">{file.extension.toUpperCase()} File</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5">
        <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Select Files
          </SoftTypography>
        </SoftBox>
        <SoftDropzone options={dropzoneOptions} onDrop={handleFileDrop} />
        <div className="mt-10 flex justify-center items-center">
          <SoftButton color="info" onClick={handleDrop}>
            Upload Files
          </SoftButton>
        </div>
      </div>
    </div>
  );
};

export default File;
