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
  const [stateName, setstateName] = useState(null);
  const [stateCode, setstateCode] = useState(null);
  const [status, setStatus] = useState(null);
  const [stateNameError, setstateNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [stateCodeError, setstateCodeError] = useState(false);

  const handleStateNameChange = (event) => {
    setstateName(event.target.value);
    setstateNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.value);
    setStatusError(false);
  };
  const handlestateCodeChange = (event) => {
    setstateCode(event.target.value);
    setstateCodeError(false);
  };

  const handleCancel = () => {
    setstateName(null);
    setStatus(null);
    setstateCode(null);
    setstateNameError(false);
    setstateCodeError(false);
    setStatusError(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (stateName === null) {
      setstateNameError(true);
      hasError = true;
    }

    if (status === null) {
      setStatusError(true);
      hasError = true;
    }
    if (stateCode === null) {
      setstateCodeError(true);
      hasError = true;
    }

    if (hasError) {
      return toast.warning("Please fill in all the details");
    }

    const parsedStatus = status === "true";
    const result = await Service(stateName, stateCode, parsedStatus);
    if (result === true) {
      toast.success("Place Of Supply add successful!");
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
          <label className="text-xs font-bold p-1">State Name</label>
          <SoftInput
            onChange={handleStateNameChange}
            style={{ borderColor: stateNameError ? "red" : "" }}
          />
          {stateNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please Enter A State Name</span>
          )}
          <div>
            <label className="text-xs font-bold p-1">State Code</label>
            <SoftInput
              onChange={handlestateCodeChange}
              style={{ borderColor: stateCodeError ? "red" : "" }}
            />
            {stateCodeError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Enter A State Code</span>
            )}
          </div>

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
            {statusError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please Select A Status</span>
            )}
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
