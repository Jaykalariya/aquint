import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "config/https";
import DefaultProfileCard from "examples/Cards/ProfileCards/DefaultProfileCard";
import IndianCurrency from "examples/IndianCurrencyFormatter";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';

/* eslint-disable react/prop-types */
function Tenderinfo({ tenderid }) {
  const token = localStorage.getItem("token");
  const [tender, settendetdata] = useState({});
 
  const customStyles = {
    fontSize: '0.9rem',
    color: '#0463b5',
  };

  
  const currentDate = new Date();

  const formatSubmissionDate = (submissionDate) => {
    return new Date(submissionDate);
  };
  
  const getSubmissionDate = (submissionDate) => {
    const differenceInDays = Math.floor((formatSubmissionDate(submissionDate) - new Date(currentDate)) / (24 * 60 * 60 * 1000));
  
    if (differenceInDays < 0) {
      return (
        <div style={{ color: "Red" }} className="text-base">
          {formatDate(submissionDate) || "N/A"}{" "}
          <div style={{    color: "#ff2525", fontStyle: "italic", fontSize: "0.8rem" }}>!Tender has passed the submission date, We missed it</div>
        </div>
      );
    } else if (differenceInDays == 0) {
      return (
        <div style={{ color: "Red" }} className="text-base">
          {formatDate(submissionDate) || "N/A"} 
          <div style={{ color: "#ff2525", fontStyle: "italic", fontSize: "0.8rem" }}>Today is the last date to submit</div>
        </div>
      );
    } else if (differenceInDays < 5) {
      return (
        <div style={{ color: "Orange" }} className="text-base">
          {formatDate(submissionDate) || "N/A"}
          <div style={{ color: "#ff2525", fontStyle: "italic", fontSize: "0.8rem" }}>Only {differenceInDays} days left</div>     
        </div>
      );
    } else {
      return (
        <div style={{ color: "Green" }} className="text-base">
          {formatDate(submissionDate) || "N/A"}
        </div>
      );
    }
  };
  

          

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

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Card id="tender-info" sx={{ overflow: "visible" }}>
      <SoftBox mt={2} pl={4} pb={1} className="border-b">
        <SoftTypography fontWeight="bold" textTransform="capitalize">
          Tender Information <InfoIcon  fontSize="medium" />
        </SoftTypography>
      </SoftBox>
      <SoftBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        // p={3}
        my={2}
        mx={4}
      >
        <SoftBox
          className="overflow-hidden"
          width="100%"
          display="flex"
          flexDirection="column"
          lineHeight={1}
        >
          <SoftBox  className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
            style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              className="block mb-1 text-sm text-gray-500"
            >
              Project Name:
            </SoftTypography>
            <div className="text-base">{tender.projectName || "N/A"}</div>
          </SoftBox>

          <div className="grid grid-cols-2">
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Type:
            </SoftTypography>
            <div className="text-base">{tender.tenderType || "N/A"}</div>
          </SoftBox>

          <SoftBox style={customStyles}
           className="border-b mb-2 p-4">
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Tender Stage:
            </SoftTypography>
            <div className="text-base">{tender.tenderStage || "N/A"}</div>
          </SoftBox>
</div>
          <div className="grid grid-cols-2">
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Project Value:
            </SoftTypography>
            <div className="text-base">{IndianCurrency(tender.projectValue)|| "N/A"}</div>
          </SoftBox>
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Submission Date :
            </SoftTypography><div>
{getSubmissionDate(tender.submissionDate)}</div>
          </SoftBox>
          </div>

          <div className="grid grid-cols-4">   
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Emd Exemption :
            </SoftTypography>
            <div className="text-base">{tender.emdExemption || "N/A"}</div>
          </SoftBox>
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
             Emd Amount :
            </SoftTypography>
            <div className="text-base">{tender.emdAmount || "0.00"}</div>
          </SoftBox>

          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
            TenderFee :
            </SoftTypography>
            <div className="text-base"> {tender.tenderFee || "0.00"}</div>
          </SoftBox>
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
           TenderFee Exemption :
            </SoftTypography>
            <div className="text-base"> {tender.tenderFeeExemption || "N/A"}</div>
          </SoftBox>
          </div>
          <SoftBox className="border-b mb-2 p-4"
          style={customStyles}
          >
            <SoftTypography
             style={{fontWeight:"500", color: "#122d48",fontSize: "0.9rem"}}
              variant="caption"
              color="text"
              className="block mb-1 text-sm text-gray-500"
            >
           Location :
            </SoftTypography>
            <div className="text-base"> {tender.location || "N/A"}</div>
          </SoftBox>
          {/* <div className="grid grid-cols-2 gap-5 mb-2">
            <SoftBox>
              <SoftTypography variant="caption" color="text">
                Submission Date :
              </SoftTypography>
              <SoftTypography color="text"> {tender.submissionDate || "N/A"}</SoftTypography>
            </SoftBox>
            <SoftBox className="mx-auto">
              <SoftTypography variant="caption" color="text">
                Emd Amount :
              </SoftTypography>
              <SoftTypography color="text">{tender.emdAmount || "N/A"}</SoftTypography>
            </SoftBox>
          </div>
          <div className="grid grid-cols-3 border-b mb-2">
            <SoftBox>
              <SoftTypography variant="caption" color="text">
                Emd Exemption :
              </SoftTypography>
              <SoftTypography color="text"> {tender.emdExemption || "N/A"}</SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="caption" color="text">
                TenderFee :
              </SoftTypography>
              <SoftTypography color="text"> {tender.tenderFee || "N/A"}</SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="caption" color="text">
                TenderFee Exemption :
              </SoftTypography>
              <SoftTypography color="text"> {tender.tenderFeeExemption || "N/A"}</SoftTypography>
            </SoftBox>
          </div>
          <SoftBox className="border-b mb-2">
            <SoftTypography variant="caption" color="text">
              Project Value:
            </SoftTypography>
            <SoftTypography color="text"> {tender.projectValue || "N/A"}</SoftTypography>
          </SoftBox>
          <SoftBox className="border-b mb-2">
            <SoftTypography variant="caption" color="text">
              Location :
            </SoftTypography>
            <SoftTypography color="text"> {tender.location || "N/A"}</SoftTypography>
          </SoftBox> */}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Tenderinfo;
