/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useEffect, useState } from "react";
import Service from "./Service";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";

function Update({ selectedItemData, itemId, sethide, fetchData }) {
    const {id} = useParams();
    const [name, setName] = useState(null);
    const [code, setcode] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [codeError, setcodeError] = useState(null);

  const { addToast } = useToasts();

  useEffect(() => {
    
    if (selectedItemData) {
      setName(selectedItemData["name"]);
      setcode(selectedItemData["code"]);
    }
  }, [selectedItemData]);


  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };
  const handlecodeChange = (event) => {
    setcode(event.target.value);
    setcodeError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (name === null) {
      setNameError(true);
      hasError = true;
    }
    if (code === null) {
        setcodeError(true);
        hasError = true;
      }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const result = await Service(name,code,id, itemId);
    if (result === true) {
      addToast("Update Product Type successfully!", {
        appearance: "success",
      });
      sethide(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Card className="mx-24" style={{ overflow: "visible" }}>
      <SoftBox p={2}>
        <SoftBox>   
        <label className="text-xs font-bold p-1">Name</label>
          <SoftInput mt={1}
            onChange={handleNameChange}
            value={name}
            error={nameError}
          />
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter Product Type Name</span>}
        
          <label className="text-xs font-bold p-1">Code</label>
          <SoftInput mt={1}
            onChange={handlecodeChange}
            value={code}
            error={codeError}
          />
          {codeError && <span style={{ color: "red", fontSize: "12px" }}>Please enter the Code</span>}
     
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

export default Update;
