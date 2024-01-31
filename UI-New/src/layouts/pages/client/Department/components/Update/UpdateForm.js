/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useState } from "react";
import Service from "./Service";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import { useToasts } from "react-toast-notifications";

// eslint-disable-next-line react/prop-types
const UpdateForm = ({ selectedItemData, itemId, sethide, fetchData }) => {
  const [departmentName, setdepartmentName] = useState(null);
  const [status, setStatus] = useState(null);
  const [departmentNameError, setdepartmentNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (selectedItemData) {
      setdepartmentName(selectedItemData["Department Name"]);

      const data =
        selectedItemData.Status.props.label === "Active"
          ? { value: "true", label: "Active" }
          : { value: "false", label: "Inactive" };
      setStatus(data);
    }
  }, [selectedItemData]);

  const handleStateNameChange = (event) => {
    setdepartmentName(event.target.value);
    setdepartmentNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
    setStatusError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (departmentName === null) {
      setdepartmentNameError(true);
      hasError = true;
    }

    if (status === null) {
      setStatusError(true);
      hasError = true;
    }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const parsedStatus = status.value === "true";
    const result = await Service(departmentName, parsedStatus, itemId);
    if (result === true) {
      addToast("Update DepartmentName successful!", {
        appearance: "success",
      });
      sethide(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Card className="mx-24">
      <SoftBox p={2}>
        <SoftBox>
          <label className="text-xs font-bold p-1">Department Name</label>
          <SoftInput
            value={departmentName}
            onChange={handleStateNameChange}
            style={{ borderColor: departmentNameError ? "red" : "" }}
          />
          {departmentNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please Enter A Department Name</span>
          )}

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
