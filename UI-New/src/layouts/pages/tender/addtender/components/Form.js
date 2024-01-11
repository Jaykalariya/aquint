import React from "react";
import { useState } from "react";
import Service from "../Service";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";

// eslint-disable-next-line react/prop-types
const Forms = ({ setShow, fetchData }) => {
  const [tenderTypeName, setTendername] = useState(null);
  const [status, setStatus] = useState(null);
  const [tenderTypeError, setTenderTypeError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const handleTenderTypeChange = (event) => {
    setTendername(event.target.value);
    setTenderTypeError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
    setStatusError(false);
  };

  const handleCancel = () => {
    setTendername(null);
    setStatus(null);
    setTenderTypeError(false);
    setStatusError(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (tenderTypeName === null) {
      setTenderTypeError(true);
      hasError = true;
    }

    if (status === null) {
      setStatusError(true);
      hasError = true;
    }

    if (hasError) {
      return toast.warning("Please fill in all the details");
    }

    const parsedStatus = status === "true";
    const result = await Service(tenderTypeName, parsedStatus);
    if (result === true) {
      toast.success("Tender add successful!");
      setShow(false);
      fetchData();
    } else {
      toast.error("failed. Please try again.");
    }
  };

  return (
    <Card className="mx-24">
      <SoftBox p={2}>
        <SoftBox>
          <label className="text-xs font-bold p-1">Tender Type</label>
          <SoftInput
            onChange={handleTenderTypeChange}
            style={{ borderColor: tenderTypeError ? "red" : "" }}
          />
          {tenderTypeError && <span style={{ color: "red" ,fontSize: "12px" }}>Please enter a Tender Type</span>}
          <div>
            <label className="text-xs font-bold p-1">Status</label>
            <SoftSelect
              onChange={handleStatusChange}
              value={status}
              placeholder="Select Satus"
              options={[
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
            />
            {statusError && <span style={{ color: "red" , fontSize: "12px" }}>Please select a Status</span>}
          </div>
          <SoftBox mt={6} width="100%" display="flex" justifyContent="space-between">
            <SoftButton onClick={handleCancel} variant="gradient" color="light">
              Cancel
            </SoftButton>
            <SoftButton onClick={handleSave} variant="gradient" color="dark">
              Save
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
};

export default Forms;
