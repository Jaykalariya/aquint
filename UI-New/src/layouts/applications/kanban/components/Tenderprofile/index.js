import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import axiosInstance from "config/https";
import { useEffect, useState } from "react";
import TabBar from "./Componets/Tabbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

/* eslint-disable react/prop-types */
function Tenderprofile({ tenderid }) {
  const token = localStorage.getItem("token");
  const [tenderdata, settendetdata] = useState({});
  console.log(tenderid);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axiosInstance.get(`/_v1/tender/tenderDetails/${tenderid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    settendetdata(result.data);
    console.log(result.data);
  };

  return (
    <div className="flex gap-2">
      {/* <Card className="w-full max-w-full md:w-96 h-auto overflow-hidden p-4 border border-gray-200 rounded-lg">
        <div>
          <div className="flex items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Other Info</h2>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">Type:</span>
              <span className="text-gray-700 text-sm">{tenderdata.tenderType}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">Project Name:</span>
              <span className="text-gray-700 text-sm">{tenderdata.projectName}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">Project Value:</span>
              <span className="text-gray-700 text-sm">{tenderdata.projectValue}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">Submission Date:</span>
              <span className="text-gray-700 text-sm">{tenderdata.submissionDate}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">Location:</span>
              <span className="text-gray-700 text-sm">{tenderdata.location}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">EMD:</span>
              <span className="text-gray-700 text-sm">{tenderdata.emd}</span>
            </div>
            <div className="flex items-center">
              <span className="w-16 font-semibold text-gray-600 text-sm">EMD Amount:</span>
              <span className="text-gray-700 text-sm">{tenderdata.emdAmount}</span>
            </div>
          </div>
        </div>
      </Card> */}
      <ProfileInfoCard
        title="Other Info"
        info={{
          Type: `${tenderdata.tenderType}}`,
          "Project Name": `${tenderdata.projectName}`,
          "Project Value": `${tenderdata.projectValue}`,
          "Submission Date": `${tenderdata.submissionDate}`,
          "Location": `${tenderdata.location}`,
          "EMD": `${tenderdata.emd}`,
          "EMD Amount": `${tenderdata.emdAmount}`,
        }}
      />
      <TabBar tenderid={tenderid} />
    </div>
  );
}

export default Tenderprofile;
