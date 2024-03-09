import React from "react";
import { useState } from "react";
import Service from "../Service";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Form = ({ setShow, fetchData }) => {
const {id} = useParams();
  const [name, setName] = useState(null);
  const [code, setcode] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [codeError, setcodeError] = useState(null);
  const { addToast } = useToasts();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };
  const handlecodeChange = (event) => {
    setcode(event.target.value);
    setcodeError(false);
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
      if (code === null) {
          setcodeError(true);
          hasError = true;
        }
        

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }
    
    const result = await Service(name,code,id);
    if (result === true) {
      addToast("Product Type added successfully!", {
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
<div>
          <label className="text-xs font-bold p-1">Name</label>
          <SoftInput mt={1}
            onChange={handleNameChange}
            value={name}
            error={nameError}
          />
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter Product Type Name</span>}
        </div>
<div>
          <label className="text-xs font-bold p-1">Code</label>
          <SoftInput mt={1}
            onChange={handlecodeChange}
            value={code}
            error={codeError}
          />
          {codeError && <span style={{ color: "red", fontSize: "12px" }}>Please enter the Code</span>}
          </div>
     
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

export default Form;
