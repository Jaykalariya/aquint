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
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const options =[
    { value: 1, label: "Length"},
    { value: 2, label: "Mass"},
    { value: 3, label: "Time"},
    { value: 4, label: "Temperature"},
    { value: 5, label: "Electric current"},
    { value: 6, label: "Amount of Substance"},
    { value: 7, label: "Luminous intensity"},
    { value: 8, label: "Others"},
  ]


  const { addToast } = useToasts();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.label);
    setTypeError(false);
  };



  const handleCancel = () => {
    setShow(false);
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
setType(type.label);
    // const parsedStatus = status.value === "true";
    const result = await Service(name,type);
    if (result === true) {
      addToast("Unit added successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Card className="mx-24" style={{ overflow: "visible" }}>
      <SoftBox p={2} >
      <SoftBox>
         
{/* <div className="md:grid md:grid-cols-2 md:gap-5"> */}

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
            onChange={handleTypeChange}
            error={typeError}
          />
          {typeError && <span style={{ color: "red", fontSize: "12px" }}>Please select Unit type</span>}
     
     
{/*          
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
