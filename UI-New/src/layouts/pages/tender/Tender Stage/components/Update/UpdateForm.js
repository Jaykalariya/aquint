/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useEffect, useState } from "react";
import Service from "./Service";
import { toast } from "react-toastify";

function UpdateForm({ selectedItemData, itemId, sethide, fetchData }) {
  const [tenderStageName, settenderStageName] = useState(null);
  const [status, setstatus] = useState(null);
  const [tenderStageNameError, settenderStageNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  console.log(selectedItemData,itemId);

  useEffect(() => {
    if (selectedItemData && selectedItemData["Tender StageName"]) {
      settenderStageName(selectedItemData["Tender StageName"]);
      const data =
        selectedItemData.Status.props.label === "Active"
          ? { value: "true", label: "Active" }
          : { value: "false", label: "Inactive" };
      setstatus(data);
    }
  }, [selectedItemData]);

  const handleTenderTypeChange = (event) => {
    settenderStageName(event.target.value);
    settenderStageNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption);
    setStatusError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (tenderStageName === null) {
      settenderStageNameError(true);
      hasError = true;
    }

    if (status === null) {
      setStatusError(true);
      hasError = true;
    }

    if (hasError) {
      return toast.warning("Please fill in all the details");
    }

    const parsedStatus = status.value === "true";
    const result = await Service(tenderStageName, parsedStatus, itemId);
    if (result === true) {
      toast.success("Update Tender Stage successful!");
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
          <label className="text-xs font-bold p-1">Tender StageName</label>
          <SoftInput
            onChange={handleTenderTypeChange}
            value={tenderStageName}
            style={{ borderColor: tenderStageNameError ? "red" : "" }}
          />
          {tenderStageNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please enter a Tender StageName</span>
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
              <span style={{ color: "red", fontSize: "12px" }}>Please select a Status</span>
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
}

export default UpdateForm;
