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
  const [totalPercentage, settotalPercentage] = useState(null);
  const [cgstPercentage, setcgstPercentage] = useState(null);
  const [sgstPercentage, setsgstPercentage] = useState(null);
  const [igstPercentage, setigstPercentage] = useState(null);
  const [totalPercentageError, settotalPercentageError] = useState(null);
  const [cgstPercentageError, setcgstPercentageError] = useState(null);
  const [sgstPercentageError, setsgstPercentageError] = useState(null);
  const [igstPercentageError, setigstPercentageError] = useState(null);

  const { addToast } = useToasts();

  console.log(selectedItemData);
  useEffect(() => {
    if (selectedItemData) {
      settotalPercentage(selectedItemData["totalPercentage"]);
      setcgstPercentage(selectedItemData["cgstPercentage"]);
      setsgstPercentage(selectedItemData["sgstPercentage"]);
      setigstPercentage(selectedItemData["igstPercentage"]);
    }
  }, [selectedItemData]);

  const handletotalPercentageChange = (event) => {
    settotalPercentage(event.target.value);
    settotalPercentageError(false);
  };
  const handlecgstPercentageChange = (event) => {
    setcgstPercentage(event.target.value);
    setcgstPercentageError(false);
  };

  const handlesgstPercentageChange = (event) => {
    setsgstPercentage(event.target.value);
    setsgstPercentageError(false);
  };
  const handleigstPercentageChange = (event) => {
    setigstPercentage(event.target.value);
    setigstPercentageError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;


        if (totalPercentage === null) {
      settotalPercentageError(true);
      hasError = true;
    }
    if (cgstPercentage === null) {
        setcgstPercentageError(true);
        hasError = true;
      }
      if (sgstPercentage === null) {
        setsgstPercentageError(true);
        hasError = true;
      }
      if (igstPercentage === null) {
        setigstPercentageError(true);
        hasError = true;
      }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const result = await Service(totalPercentage,cgstPercentage,sgstPercentage,igstPercentage, itemId);
    if (result === true) {
      addToast("Update Gst slab successful!", {
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
          <label className="text-xs font-bold p-1">Total Percentage</label>
          <SoftInput
            onChange={handletotalPercentageChange}
            value={totalPercentage}
            error={totalPercentageError}
            type="number"
          />
          {totalPercentageError && <span style={{ color: "red", fontSize: "12px" }}>Please enter total Percentage</span>}
         
          <div className="md:grid md:grid-cols-3 md:gap-5">
        <div>
          <label className="text-xs font-bold p-1">CGST Percentage</label>
          <SoftInput
            onChange={handlecgstPercentageChange}
            value={cgstPercentage}
            error={cgstPercentageError}
            type="number"
          />
          {cgstPercentageError && <span style={{ color: "red", fontSize: "12px" }}>Please enter CGST Percentage</span>}
          </div>
          <div>
          <label className="text-xs font-bold p-1">SGST Percentage</label>
          <SoftInput
            onChange={handlesgstPercentageChange}
            value={sgstPercentage}
            error={sgstPercentageError}
            type="number"
          />
          {sgstPercentageError && <span style={{ color: "red", fontSize: "12px" }}>Please enter SGST Percentage</span>}
          </div>
         
          <div>
          <label className="text-xs font-bold p-1">IGST Percentage</label>
          <SoftInput
            onChange={handleigstPercentageChange}
            value={igstPercentage}
            error={igstPercentageError}
            type="number"
          />
          {igstPercentageError && <span style={{ color: "red", fontSize: "12px" }}>Please enter IGST Percentage</span>}
          </div>
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
