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
const Forms = ({options,fetchStepOrderData, setShow, fetchData }) => {
  const [stepName, setstepName] = useState(null);
  const [stepOrder, setstepOrder] = useState(null);
  const [isCompulsory, setisCompulsory] = useState(null);
  const [isAbleToAddProduct, setisAbleToAddProduct] = useState(null);

  const [stepNameError, setstepNameError] = useState(null);
  const [stepOrderError, setstepOrderError] = useState(null);
  const [isCompulsoryError, setisCompulsoryError] = useState(null);
  const [isAbleToAddProductError, setisAbleToAddProductError] = useState(null);
  const selection=[
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const { addToast } = useToasts();

  const handleStepNameChange = (event) => {
    setstepName(event.target.value);
  };
  
  const handleStepOrderChange = (selectedOption) => {
    setstepOrder(selectedOption);
  };
  
  const handleIsCompulsoryChange = (selectedOption) => {
    setisCompulsory(selectedOption);
  };
  
  const handleIsAbleToAddProductChange = (selectedOption) => {
    setisAbleToAddProduct(selectedOption);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (stepName === null) {
      setstepNameError(true);
      hasError = true;
    }
    if (stepOrder === null) {
        setstepOrderError(true);
        hasError = true;
      }
      if (isCompulsory === null) {
        setisCompulsoryError(true);
        hasError = true;
      }
      if (isAbleToAddProduct === null ) {
        setisAbleToAddProductError(true);
        hasError = true;
      }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    // const parsedStatus = status.value === "true";
    const result = await Service(stepName,stepOrder,isCompulsory,isAbleToAddProduct);
    if (result === true) {
      addToast("Project Initial Step added successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
      fetchStepOrderData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Card className="mx-24" style={{ overflow: "visible" }}>
      <SoftBox p={2}>
      <SoftBox>
      <label className="text-xs font-bold p-1">Initial Step Name</label>
          <SoftInput
            onChange={handleStepNameChange}
            value={stepName}
            error={stepNameError}
          />
          {stepNameError && <span style={{ color: "red", fontSize: "12px" }}>Please enter Initial Step Name</span>}
         
          <div className="md:grid md:grid-cols-2 md:gap-5">
          <div>
  <label className="text-xs font-bold p-1">Is Compulsory</label>
  <SoftSelect
    placeholder="Select is Compulsory"
    options={selection}
    value={isCompulsory}
    onChange={handleIsCompulsoryChange}
    error={isCompulsoryError}
  />
  {isCompulsoryError && <span style={{ color: "red", fontSize: "12px" }}>Please select is Compulsory</span>}
</div>

         
        <div>
        <label className="text-xs font-bold p-1">Is Able to Add Product</label>
        <SoftSelect
        placeholder="Select is Able to Add Product"
        options={selection}
        value={isAbleToAddProduct}
        onChange={handleIsAbleToAddProductChange}
        error={isAbleToAddProductError}
        />
          {isAbleToAddProductError && <span style={{ color: "red", fontSize: "12px" }}>Please select is Able to Add Product</span>}
  
       </div>
</div>

<div>
        <label className="text-xs font-bold p-1">Step Order</label>
        <SoftSelect
          placeholder="Select Step Order"
          options={options}
          value={stepOrder}
          onChange={handleStepOrderChange}
          error={stepOrderError}
          />
          {stepOrderError && <span style={{ color: "red", fontSize: "12px" }}>Please select Step Order</span>}
  
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
};

export default Forms;
