import axiosInstance from "config/https";
import DefaultProfileCard from "examples/Cards/ProfileCards/DefaultProfileCard";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function Tenderinfo({ tenderid }) {
  const token = localStorage.getItem("token");
  const [tender, settendetdata] = useState({});

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
    <div className="container my-auto px-5 pt-8">
      <p className="text-center text-base font-semibold">Tender Info</p>
      <div className="p-4 max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Type</h3>
          <p className="truncate text-base">{tender.tenderType || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Project Name</h3>
          <p className="truncate text-base">{tender.projectName || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Project Value</h3>
          <p className="truncate text-base">{tender.projectValue}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Submission Date</h3>
          <p className="truncate text-base">{tender.submissionDate || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Emd Amount</h3>
          <p className="truncate text-base">{tender.emdAmount || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Emd Exemption</h3>
          <p className="truncate text-base">{tender.emdExemption || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">TenderFee</h3>
          <p className="truncate text-base">{tender.tenderFee || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base  font-semibold text-gray-800 w-32 truncate">
            TenderFee Exemption
          </h3>
          <p className="truncate text-base">{tender.tenderFeeExemption || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Tender Stage</h3>
          <p className="truncate text-base">{tender.tenderStage || "N/A"}</p>
        </div>
        <div className="flex gap-3 items-center mb-2">
          <h3 className="text-base font-semibold text-gray-800 w-32 truncate">Location</h3>
          <p className="truncate text-base">{tender.location || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default Tenderinfo;
