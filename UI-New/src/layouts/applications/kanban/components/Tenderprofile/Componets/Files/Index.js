/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axiosInstance from "config/https";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { Delete, GetApp, Visibility } from "@mui/icons-material";
import BirthdateFormatter from "examples/BirthdateFormatter";
import pdf from "../../../../../../../Image/pdf.png";
import jpg from "../../../../../../../Image/jpg.png";
import png from "../../../../../../../Image/png.png";
import txt from "../../../../../../../Image/txt.png";
import Default from "../../../../../../../Image/documents.png";

const File = ({ tenderid }) => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [Filelist, setfilelist] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
    console.log("abhi", result.data);
  };

  const handleFileUpload = () => {
    // axiosInstance.post(`/_v1/tender/upload/file/${tenderid}`, {
    //   selectedFile,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    console.log(selectedFile);
    setMessage("Files uploaded successfully!");
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
      <div className="flex overflow-y-auto" style={{ maxHeight: "500px" }}>
        <div className=" p-4 rounded-md w-2/3 overflow-y-auto" style={{ maxHeight: "400px" }}>
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
        <div className="w-2/3 p-4 border-l" style={{ maxHeight: "500px" }}>
          <h2 className="text-lg font-bold mb-4">Upload Files</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer">
              <label htmlFor="file-upload" className="text-gray-600">
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected File"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Click or drag file here</span>
                )}
              </label>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </div>
            {selectedFile && (
              <div className="mt-4">
                <p className="text-gray-800">Selected File: {selectedFile.name}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-5">
            <SoftButton color="info" onClick={handleFileUpload}>
              Upload
            </SoftButton>
          </div>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </div>
      </div>
    </Card>
  );
};

export default File;
