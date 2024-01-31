import React from "react";
import { useState } from "react";
import Service from "../Service";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import { useToasts } from "react-toast-notifications";

// eslint-disable-next-line react/prop-types
const Forms = ({ setShow, fetchData }) => {
  const [stateName, setstateName] = useState(null);
  const [stateCode, setstateCode] = useState(null);
  const [status, setStatus] = useState(null);
  const [stateNameError, setstateNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [stateCodeError, setstateCodeError] = useState(false);
  const { addToast } = useToasts();

  const handleStateNameChange = (event) => {
    setstateName(event.target.value);
    setstateNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
    setStatusError(false);
  };
  const handlestateCodeChange = (event) => {
    setstateCode(event.target.value);
    setstateCodeError(false);
  };

  const handleCancel = () => {
    setShow(false);
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
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const parsedStatus = status.value === "true";
    const result = await Service(stateName, stateCode, parsedStatus);
    if (result === true) {
      addToast("Place Of Supply add successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
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
