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
  const [tenderTypeName, setTendername] = useState(null);
  const [status, setStatus] = useState(null);
  const [tenderTypeError, setTenderTypeError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (selectedItemData && selectedItemData["Tender Type"]) {
      setTendername(selectedItemData["Tender Type"]);
      const data =
        selectedItemData.Status.props.label === "Active"
          ? { value: "true", label: "Active" }
          : { value: "false", label: "Inactive" };
      setStatus(data);
    }
  }, [selectedItemData]);

  const handleTenderTypeChange = (event) => {
    setTendername(event.target.value);
    setTenderTypeError(false);
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

    if (tenderTypeName === null) {
      setTenderTypeError(true);
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
    const result = await Service(tenderTypeName, parsedStatus, itemId);
    if (result === true) {
      addToast("Update TenderType successful!", {
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
          <label className="text-xs font-bold p-1">Tender Type</label>
          <SoftInput
            onChange={handleTenderTypeChange}
            value={tenderTypeName}
            error={tenderTypeError}
          />
          {tenderTypeError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please enter a Tender Type</span>
          )}
          <div>
            <label className="text-xs font-bold p-1">Status</label>
            <SoftSelect
              onChange={handleStatusChange}
              value={status}
              placeholder="Select Satus"
              error={statusError}
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
