/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useState } from "react";
import Service from "../service";
import { useToasts } from "react-toast-notifications";

function Stageform({ setShow, fetchData }) {
  const [tenderStageName, settenderStageName] = useState(null);
  const [status, setstatus] = useState(null);
  const [tenderStageNameError, settenderStageNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const { addToast } = useToasts();

  const handletenderStageName = (event) => {
    settenderStageName(event.target.value);
    settenderStageNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption);
    setStatusError(false);
  };

  const handleCancel = () => {
    setShow(false);
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
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const parsedStatus = status.value === "true";
    const result = await Service(tenderStageName, parsedStatus);
    if (result === true) {
      addToast("add TenderStage successful!", {
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
