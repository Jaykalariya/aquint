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
  const [name, setname] = useState(null);
  // const [status, setStatus] = useState(null);
  const [nameError, setnameError] = useState(false);
  // const [statusError, setStatusError] = useState(false);
  const { addToast } = useToasts();

  const handlenameChange = (event) => {
    setname(event.target.value);
    setnameError(false);
  };

  // const handleStatusChange = (selectedOption) => {
  //   setStatus(selectedOption);
  //   setStatusError(false);
  // };

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (name === null) {
      setnameError(true);
      hasError = true;
    }

    // if (status === null) {
    //   setStatusError(true);
    //   hasError = true;
    // }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    // const parsedStatus = status.value === "true";
    const result = await Service(name);
    if (result === true) {
      addToast("Role add successful!", {
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
          <label className="text-xs font-bold p-1">Name</label>
          <SoftInput onChange={handlenameChange} style={{ borderColor: nameError ? "red" : "" }} />
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a name</span>}
          {/* <div>
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
              <span style={{ color: "red", fontSize: "12px" }}>Please select a Status</span>
            )}
          </div> */}
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
