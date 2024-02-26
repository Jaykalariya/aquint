/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import {saveAs} from 'file-saver';
import axiosInstance from "config/https";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import { Card, Icon } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { Delete, GetApp, Visibility } from "@mui/icons-material";
import BirthdateFormatter from "examples/BirthdateFormatter";
import pdf from "../../../../../../../Image/pdf.png";
import jpg from "../../../../../../../Image/jpg.png";
import png from "../../../../../../../Image/png.png";
import txt from "../../../../../../../Image/txt.png";
import Default from "../../../../../../../Image/documents.png";
import Swal from "sweetalert2";

const File = ({ tenderid }) => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hide, sethide] = useState(true);
  const fileInputRef = useRef(null);

  console.log("tenderid", tenderid);

  const handleEverything = async (e) => {
    handleFileChange(e);
    await handleFileUpload();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(e.target.files);
  };

  const onView = (file) => {
    openFileInNewTab(file);
  };

  const openFileInNewTab = (file) => {
    const fileUrl = getFileUrl(file);

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      // Handle unsupported file type or error
      console.error("Unsupported file type or error in opening file.");
    }
  };

  const getFileUrl = (file) => {
    // Add logic to determine the file URL based on file type
    // For example, return the URL of the uploaded file
    // For simplicity, assuming the file is uploaded to a specific location
    return `${file.documentUrl}`;
  };

  // Function to handle file download

  // Function to download the file
  const onDownload = (file) => {
    saveAs(file.documentUrl,file.documentName);
  };

  useEffect(() => {
    handleFileUpload();
    fetchData();
  }, [selectedFile]);
  const fetchData = async () => {
    const result = await axiosInstance.get(`/_v1/tender/allDocuments/${tenderid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setfilelist(result.data);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage("No file selected!");
      console.log("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post(`/_v1/tender/upload/file/${tenderid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);

      setMessage("File uploaded successfully!");
      setSelectedFile(null);
      Swal.fire("Done!", "File uploaded", "success");
      // fetchData();
      // sethide(!hide);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  const FileListItem = ({ extension }) => {
    if (!extension) return null;
    let icon;

    switch (extension.toLowerCase()) {
      case "pdf":
        icon = <img src={pdf} alt="abhi" className="w-10 h-10" />;
        break;
      case "jpg":
        icon = <img src={jpg} alt="abhi" className="w-10 h-10" />;
        break;
      case "jpeg":
        icon = <img src={jpg} alt="abhi" className="w-10 h-10" />;
        break;
      case "txt":
        icon = <img src={txt} alt="abhi" className="w-10 h-10" />;
        break;
      case "png":
        icon = <img src={png} alt="abhi" className="w-10 h-10" />;
        break;
      default:
        icon = <img src={Default} alt="abhi" className="w-10 h-10" />;
    }

    return icon;
  };

  return (
    <Card id="file" sx={{ overflow: "visible" }}>
      <SoftBox mt={2} pl={4} className="border-b">
        <SoftTypography fontWeight="large" textTransform="capitalize">
          File
        </SoftTypography>
      </SoftBox>
      {hide ? (
        <SoftBox className="flex justify-end mt-2 mb-2.5 mr-5">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
            ref={fileInputRef}
          />
          <SoftButton color="info" onClick={() => fileInputRef.current.click()}>
            Upload
          </SoftButton>
        </SoftBox>
      ) : (
        <SoftBox className="flex justify-end mt-2 mb-2.5 mr-5">
          <SoftButton color="info" onClick={() => sethide(!hide)}>
            Back
          </SoftButton>
        </SoftBox>
      )}
      <div style={{ maxHeight: "500px" }}>
        {hide ? (
          <div className="flex overflow-y-auto">
            <div
              className=" p-4 rounded-md w-screen overflow-y-auto"
              style={{ maxHeight: "400px" }}
            >
              <h2 className="text-xl font-bold mb-4">Files</h2>
              <ul className="divide-y divide-gray-200">
                {Filelist.map((file, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="my-auto">
                        <FileListItem extension={file.extension} />
                      </div>
                      <div>
                        <span className="text-lg font-semibold">{file.documentName}</span>
                        <p className="text-sm text-gray-500">
                          {file.createdBy} - {BirthdateFormatter(file.createdOn)}
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
                      {/* <a
                        href={`${file.documentUrl}`}
                        download={`${file.documentName}`}
                        rel="noreferrer"
                      > */}
                      <button
                        onClick={() => onDownload(file)}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        <GetApp />
                      </button>
                      {/* </a> */}
                      <button
                        onClick={() => onDelete(file)}
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
        ) : (
          <div className="flex flex-col items-center justify-center mb-20 space-y-4">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-lg flex items-center"
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg> */}
              <span>Choose File</span>
              <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
            </label>
            <SoftButton p={2.5} color="info" onClick={handleFileUpload}>
              Upload
            </SoftButton>
            {/* {message && <p className="text-green-500 mt-2">{message}</p>} */}
          </div>
        )}
      </div>
    </Card>
  );
};

export default File;
