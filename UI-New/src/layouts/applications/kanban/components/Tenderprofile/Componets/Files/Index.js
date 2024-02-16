/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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

const File = ({ tenderid }) => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hide, sethide] = useState(true);

  console.log("tenderid", tenderid);

  const handleEverything = async(e) =>{
    handleFileChange(e);
   await handleFileUpload(); 
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(e.target.files);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
      fetchData();
      sethide(!hide);
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
      <div className="flex justify-between">
        <SoftBox mt={2} pl={4} className="border-b">
          <SoftTypography fontWeight="large" textTransform="capitalize">
            File
          </SoftTypography>
        </SoftBox>
        {hide ? (
          <SoftBox className="flex justify-end mt-4 mr-5">
            <SoftButton color="info" onClick={() => sethide(!hide)}>
              Upload
            </SoftButton>
          </SoftBox>
        ) : (
          <SoftBox className="flex justify-end mt-5 mr-5">
            <SoftButton color="info" onClick={() => sethide(!hide)}>
              Back
            </SoftButton>
          </SoftBox>
        )}
      </div>
      <div style={{ maxHeight: "500px" }}>
        {hide ? (
          Filelist.length === 0 ? (
              <Nodata/>
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
          )
        ) : (
          <div className="container mx-auto flex justify-center items-center">
            <div className="mb-5 w-80 bg-white rounded-lg shadow-md p-6">
              <h1 className="text-lg font-semibold mb-4 text-center">Upload Your File</h1>
              <label
                htmlFor="fileInput"
                className="flex justify-center items-center w-full h-32 border-dashed border-2 border-gray-400 rounded-lg mb-4 cursor-pointer"
              >
                <span className="text-gray-400">Click here</span>
                <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <div className="text-center text-gray-500 mb-4">
                {selectedFile ? selectedFile.name : ""}
              </div>
              <button
                onClick={handleFileUpload}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default File;
