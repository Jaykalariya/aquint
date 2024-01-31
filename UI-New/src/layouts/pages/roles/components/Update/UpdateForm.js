/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useEffect, useState } from "react";
import Service from "./Service";
import { useToasts } from "react-toast-notifications";

function UpdateForm({ selectedItemData, itemId, sethide, fetchData }) {
  const [name, setname] = useState(null);
  const [nameError, setnameError] = useState(false);
  const { addToast } = useToasts();

  console.log(selectedItemData);
  useEffect(() => {
    if (selectedItemData && selectedItemData["Name"]) {
      setname(selectedItemData["Name"]);
    }
  }, [selectedItemData]);

  const handleRoleChange = (event) => {
    setname(event.target.value);
    setnameError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (name === null) {
      setnameError(true);
      hasError = true;
    }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const result = await Service(name, itemId);
    if (result === true) {
      addToast("Update Role successful!", {
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
          <label className="text-xs font-bold p-1">Role</label>
          <SoftInput
            onChange={handleRoleChange}
            value={name}
            style={{ borderColor: nameError ? "red" : "" }}
          />
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a name</span>}
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
}

export default UpdateForm;
