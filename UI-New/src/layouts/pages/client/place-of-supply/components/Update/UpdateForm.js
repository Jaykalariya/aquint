/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useState } from "react";
import Service from "./Service";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";

// eslint-disable-next-line react/prop-types
const UpdateForm = ({selectedItemData, itemId, sethide, fetchData }) => {
  const [stateName, setstateName] = useState(null);
  const [stateCode, setstateCode] = useState(null);
  const [status, setStatus] = useState(null);
  const [stateNameError, setstateNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [stateCodeError, setstateCodeError] = useState(false);
  

  useEffect(() => {
    if (selectedItemData) {
        setstateName(selectedItemData["State Name"]);
        setstateCode(selectedItemData["State Code"]);
      const data =
        selectedItemData.Status.props.label === "Active"
          ? { value: "true", label: "Active" }
          : { value: "false", label: "Inactive" };
      setStatus(data);
    }
  }, [selectedItemData]);

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

  const handleBack = () => {
    sethide(false);
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

    const parsedStatus = status.value === "true";
    const result = await Service(stateName,stateCode, parsedStatus, itemId);
    if (result === true) {
      toast.success("Update Place Of Supply successful!");
      sethide(false);
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
            value={stateName}
            onChange={handleStateNameChange}
            style={{ borderColor: stateNameError ? "red" : "" }}
          />
          {stateNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please Enter A State Name</span>
          )}
          <div>
            <label className="text-xs font-bold p-1">State Code</label>
            <SoftInput
              value={stateCode}
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
            <SoftButton onClick={handleBack} variant="gradient" color="light">
              Back
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

export default UpdateForm;
