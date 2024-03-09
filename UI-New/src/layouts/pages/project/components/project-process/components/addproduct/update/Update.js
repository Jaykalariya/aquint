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

function Update({withGstOptions,esclTypeOptions,unitOptions, gstSlabsOptions,productTypeOptions, fetchData ,selectedItemData, itemId, sethide}) {
    const { id } = useParams();
    const [productTypeId, setProductTypeId] = useState(null);
    const [itemCode, setItemCode] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(null);
    const [unitId, setUnitId] = useState(null);
    const [unitRate, setUnitRate] = useState(null);
    const [basicValue, setBasicValue] = useState(null);
    const [esclType, setEsclType] = useState(null);
    const [esclPercentage, setEsclPercentage] = useState(null);
    const [gstSlabsId, setGstSlabsId] = useState(null);
    const [amount, setAmount] = useState(null);
    const [withGst, setWithGst] = useState(null);
    const [biddingUnit, setBiddingUnit] = useState(null);
  
    const [productTypeIdError, setProductTypeIdError] = useState(null);
    const [itemCodeError, setItemCodeError] = useState(null);
    const [itemQuantityError, setItemQuantityError] = useState(null);
    const [unitIdError, setUnitIdError] = useState(null);
    const [unitRateError, setUnitRateError] = useState(null);
    const [basicValueError, setBasicValueError] = useState(null);
    const [esclTypeError, setEsclTypeError] = useState(null);
    const [esclPercentageError, setEsclPercentageError] = useState(null);
    const [gstSlabsIdError, setGstSlabsIdError] = useState(null);
    const [amountError, setAmountError] = useState(null);
    const [withGstError, setWithGstError] = useState(null);
    const [biddingUnitError, setBiddingUnitError] = useState(null);
  
  const { addToast } = useToasts();
  console.log(selectedItemData);
 
  useEffect(() => {
    if (selectedItemData) {
const selectedProductTypeOption = findOptionByValue(selectedItemData["productType"], productTypeOptions);
const selectedGstSlabsOption = findOptionByValue(selectedItemData["gstSlab"], gstSlabsOptions);
const selectedUnitOption = findOptionByValue(selectedItemData["unit"], unitOptions);
const selectedEsclTypeOption = findOptionByValue(selectedItemData["esclType"], esclTypeOptions);
const selectedWithGstOption = findOptionByValue(selectedItemData["withGst"], withGstOptions);
console.log(selectedProductTypeOption + " " + selectedUnitOption + " " + selectedGstSlabsOption)
        setProductTypeId(selectedProductTypeOption);
        setItemCode(selectedItemData["itemCode"]);
        setItemQuantity(selectedItemData["quantity"]);
        setUnitId(selectedUnitOption);
        setUnitRate(selectedItemData["unitRate"]);
        setBasicValue(selectedItemData["basicValue"]);
        setEsclType(selectedEsclTypeOption);
        setEsclPercentage(selectedItemData["esclPercentage"]);
        setGstSlabsId(selectedGstSlabsOption);
        setAmount(selectedItemData["amount"]);
        setWithGst(selectedWithGstOption);
        setBiddingUnit(selectedItemData["biddingUnit"]);        
    }
  }, [selectedItemData]);
 
//Searching label
const findOptionByValue = (value, options) => {
    return options.find(option => option.value == value) || value;
  };
  

//handle
const handleProductTypeIdChange = (selectedOption) => {
    setProductTypeId(selectedOption);
    setProductTypeIdError(false);
  };
  
  const handleItemCodeChange = (event) => {
    setItemCode(event.target.value);
    setItemCodeError(false);
  };
  
  const handleItemQuantityChange = (event) => {
    setItemQuantity(event.target.value);
    setItemQuantityError(false);
  };
  
  const handleUnitIdChange = (selectedOption) => {
    setUnitId(selectedOption);
    setUnitIdError(false);
  };
  
  const handleUnitRateChange = (event) => {
    setUnitRate(event.target.value);
    setUnitRateError(false);
  };
  
  const handleBasicValueChange = (event) => {
    setBasicValue(event.target.value);
    setBasicValueError(false);
  };
  
  const handleEsclTypeChange = (selectedOption) => {
    setEsclType(selectedOption);
    if(selectedOption["value"]=="NONE"){
      setEsclPercentage(0);
    }
    else{
      if(esclPercentage ==0){
      setEsclPercentage(null);
      }
    }
    setEsclTypeError(false);
  };
  
  const handleEsclPercentageChange = (event) => {
    setEsclPercentage(event.target.value);
    setEsclPercentageError(false);
  };
  
  const handleGstSlabsIdChange = (selectedOption) => {
    setGstSlabsId(selectedOption);
    setGstSlabsIdError(false);
  };
  
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setAmountError(false);
  };
  
  const handleWithGstChange = (selectedOption) => {
    setWithGst(selectedOption);
    setWithGstError(false);
  };
  
  const handleBiddingUnitChange = (event) => {
    setBiddingUnit(event.target.value);
    setBiddingUnitError(false);
  };

  const handleBack = () => {
    sethide(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (productTypeId === null) {
        setProductTypeIdError(true);
        hasError = true;
      }
  
      if (itemCode === null) {
        setItemCodeError(true);
        hasError = true;
      }
  
      if (itemQuantity === null) {
        setItemQuantityError(true);
        hasError = true;
      }
  
      if (unitId === null) {
        setUnitIdError(true);
        hasError = true;
      }
  
      if (unitRate === null) {
        setUnitRateError(true);
        hasError = true;
      }
  
      if (basicValue === null) {
        setBasicValueError(true);
        hasError = true;
      }
  
      if (esclType === null) {
        setEsclTypeError(true);
        hasError = true;
      }
  
      if (esclPercentage === null) {
        setEsclPercentageError(true);
        hasError = true;
      }
  
      if (gstSlabsId === null) {
        setGstSlabsIdError(true);
        hasError = true;
      }
  
      if (amount === null) {
        setAmountError(true);
        hasError = true;
      }
  
      if (withGst === null) {
        setWithGstError(true);
        hasError = true;
      }
  
      if (biddingUnit === null) {
        setBiddingUnitError(true);
        hasError = true;
      }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const result = await Service(
        itemId,
        id,
        productTypeId,
        itemCode,
        itemQuantity,
        unitId,
        unitRate,
        basicValue,
        esclType,
        esclPercentage,
        gstSlabsId,
        amount,
        withGst,
        biddingUnit
      );
         if (result === true) {
      addToast("Update product successful!", {
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
        <div className="md:grid md:grid-cols-3 md:gap-5">
      <div>
        <label className="text-xs font-bold p-1">Product Type</label>
        <SoftSelect
    placeholder="Select Product Type"
    value={productTypeId}
    options={productTypeOptions}
    onChange={handleProductTypeIdChange}
    error={productTypeIdError}
  />
 {productTypeIdError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid Product type</span>}
      </div>

      <div>
        <label className="text-xs font-bold p-1">Item Code</label>
        <SoftInput
          mt={1}
          onChange={handleItemCodeChange}
          value={itemCode}
          error={itemCodeError}
        />
        {itemCodeError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid item code</span>}
      </div>

      <div>
        <label className="text-xs font-bold p-1">Item Quantity</label>
        <SoftInput
          mt={1}
          onChange={handleItemQuantityChange}
          value={itemQuantity}
          error={itemQuantityError}
          type="number"
        />
        {itemQuantityError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid item quantity</span>}
      </div>
      </div>


<div className="md:grid md:grid-cols-3 md:gap-5">
      <div>
        <label className="text-xs font-bold p-1">Unit</label>
        <SoftSelect
    placeholder="Select Unit"
    value={unitId}
    options={unitOptions}
    onChange={handleUnitIdChange}
    error={unitIdError}
  />
        {unitIdError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid Unit</span>}
      </div>

      <div>
        <label className="text-xs font-bold p-1">Unit Rate</label>
        <SoftInput
          mt={1}
          onChange={handleUnitRateChange}
          value={unitRate}
          error={unitRateError}
          type="number"
        />
        {unitRateError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid unit rate</span>}
      </div>

      <div>
        <label className="text-xs font-bold p-1">Basic Value</label>
        <SoftInput
          mt={1}
          onChange={handleBasicValueChange}
          value={basicValue}
          error={basicValueError}
          type="number"
        />
        {basicValueError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid basic value</span>}
      </div>
</div>


<div className="md:grid md:grid-cols-3 md:gap-5">
 <div>
        <label className="text-xs font-bold p-1">GST Slab</label>
        <SoftSelect
    placeholder="Select GST slab"
    value={gstSlabsId}
    options={gstSlabsOptions}
    onChange={handleGstSlabsIdChange}
    error={gstSlabsIdError}
  />
        {gstSlabsIdError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid GST slab</span>}
      </div>
      <div>
        <label className="text-xs font-bold p-1">ESCL Type</label>
        <SoftSelect
    placeholder="Select ESCL Type"
    value={esclType}
    options={esclTypeOptions}
    onChange={handleEsclTypeChange}
    error={esclTypeError}
  />
        {esclTypeError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid ESCL type</span>}
      </div>

{esclPercentage!=0 ?
      <div>
        <label className="text-xs font-bold p-1">ESCL Percentage</label>
        <SoftInput
          mt={1}
          onChange={handleEsclPercentageChange}
          value={esclPercentage}
          error={esclPercentageError}
          type="number"
        />
        {esclPercentageError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid ESCL percentage</span>}
      </div>
      :<div></div>
  }
      </div>

 <div className="md:grid md:grid-cols-3 md:gap-5">
      <div>
        <label className="text-xs font-bold p-1">Amount</label>
        <SoftInput
          mt={1}
          onChange={handleAmountChange}
          value={amount}
          error={amountError}
          type="number"
        />
        {amountError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid amount</span>}
      </div>


      <div>
        <label className="text-xs font-bold p-1">With GST</label>
        <SoftSelect
    placeholder="Select if with GST"
    value={withGst}
    options={withGstOptions}
    onChange={handleWithGstChange}
    error={withGstError}
  />
        {withGstError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid value for with GST</span>}
      </div>

      <div>
        <label className="text-xs font-bold p-1">Bidding Unit</label>
        <SoftInput
          mt={1}
          onChange={handleBiddingUnitChange}
          value={biddingUnit}
          error={biddingUnitError}
          type="number"
        />
        {biddingUnitError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a valid bidding unit</span>}
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

export default Update;
