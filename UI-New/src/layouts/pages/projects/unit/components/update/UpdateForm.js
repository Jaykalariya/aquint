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
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [typeError, setTypeError] = useState(null);


  const { addToast } = useToasts();

  console.log(selectedItemData, type);
  useEffect(() => {
    
    if (selectedItemData) {
      setName(selectedItemData["name"]);
      const sv =
      selectedItemData["type"] == "Length"
        ? { value: 1, label: "Length"}
        : selectedItemData["type"] == "Mass"
        ?   { value: 2, label: "Mass"}

        : selectedItemData["type"] == "Time"
        ?   { value: 3, label: "Time"}

        : selectedItemData["type"] == "Temperature"
        ?   { value: 4, label: "Temperature"}

        : selectedItemData["type"] == "Electric Current"
        ?   { value: 2, label: "Electric Current"}

        : selectedItemData["type"] == "Amount of Substance"
        ?   { value: 2, label: "Amount of Substance"}

        : selectedItemData["type"] == "Luminous Intensity"
        ?   { value: 2, label: "Luminous Intensity"}

        :  { value: 8, label: "Others"}
    setType(sv);
    }
  }, [selectedItemData]);

  const options =[
    { value: 1, label: "Length"},
    { value: 2, label: "Mass"},
    { value: 3, label: "Time"},
    { value: 4, label: "Temperature"},
    { value: 5, label: "Electric Current"},
    { value: 6, label: "Amount of Substance"},
    { value: 7, label: "Luminous Intensity"},
    { value: 8, label: "Others"},
  ]

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption);
    setTypeError(false);
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
    if (type === null) {
        setTypeError(true);
        hasError = true;
      }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }
    setType(type.label)
    const result = await Service(name,type.label, itemId);
    if (result === true) {
      addToast("Update Unit successful!", {
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
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter Unit name</span>}
        
          <label className="text-xs font-bold p-1">Type</label>
          <SoftSelect
          placeholder="Select Unit Type"
          options={options}
          value={type}
          onChange={handleTypeChange}
          error={typeError}
          />
          {typeError && <span style={{ color: "red", fontSize: "12px" }}>Please select Unit type</span>}
  
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
