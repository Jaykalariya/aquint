/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { saveAs } from 'file-saver';
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
import Nodata from "components/Nodata";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Swal from "sweetalert2";

const File = ({ tenderid,onFileChange }) => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deletedFile, setDeletedFile] = useState(null);
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
const handleDeletedFile=(deletedFile)=>{
  setDeletedFile(deletedFile)
}
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

  const getFileUrl = (file) => {
    return `${file.documentUrl}`;
  };

  const onDownload = (file) => {
    saveAs(file.documentUrl, file.documentName);
  };

  useEffect(() => {
    handleFileUpload();
    handleFileDelete();
    fetchData();
  }, [selectedFile, deletedFile]);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/tender/allDocuments/${tenderid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setfilelist(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      onFileChange();
      setSelectedFile(null);
      Swal.fire("Done!", "File uploaded", "success");
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  const showAlert = (deletedFile) => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDeletedFile(deletedFile)
          handleFileDelete();
        }
      });
  };



  const handleFileDelete = async () => {
     if (!deletedFile) {
      setMessage("No file selected!");
      console.log("No file selected!");
      return;
    }
  
    try {
      const response = await axiosInstance.delete(`/_v1/tender/delete/file/${deletedFile}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Delete response:", response.data);
      setDeletedFile(null);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      onFileChange();
      setMessage("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("Failed to delete file. Please try again.");
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
      <div className="flex justify-between">
        <SoftBox mt={2} pl={4} className="border-b">
          <SoftTypography fontWeight="bold" mt={2} textTransform="capitalize">
            File <InsertDriveFileIcon fontSize="medium" />
          </SoftTypography>
        </SoftBox>
        
      </div>
      
      {hide ? (
        <SoftBox className="flex justify-end mr-5">
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
                      <button
                        onClick={() => onDownload(file)}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        <GetApp />
                      </button>
                      <button
                          onClick={() => showAlert(file.documentId)}
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
          <>
            {Filelist.length === 0 ? (
              <Nodata />
            ) : (
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
                              {file.createdBy} -{BirthdateFormatter(file.createdOn)}
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
                            onClick={() => onDownload(file)}
                            className="text-green-500 hover:text-green-700 mr-2"
                          >
                            <GetApp />
                          </button>
                          <button
                            onClick={() => showAlert(file.documentId)}
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
          </>
        )}
      </div>
    </Card>
  );
};

export default File;
