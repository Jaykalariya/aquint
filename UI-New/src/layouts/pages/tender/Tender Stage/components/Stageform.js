/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service";

function Stageform({setShow, fetchData}) {
  const [tenderStageName, settenderStageName] = useState(null);
  const [status, setstatus] = useState(null);
  const [tenderStageNameError, settenderStageNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  

  const handletenderStageName = (event) => {
    settenderStageName(event.target.value);
    settenderStageNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption);
    setStatusError(false);
  };

  const handleCancel = () => {
    settenderStageName(null);
    setstatus(null);
    settenderStageNameError(false);
    setStatusError(false);
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
    const result = await Service(tenderStageName,parsedStatus);
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
          <label className="text-xs font-bold p-1">Tender StageName</label>
          <SoftInput
            onChange={handletenderStageName}
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
}

export default Stageform;
