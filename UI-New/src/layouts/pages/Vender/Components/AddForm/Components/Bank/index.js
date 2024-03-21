/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import SoftInput from "components/SoftInput";

function Bank({
  formdata,
  handleInputChange,
  submitted,
  setreaccountNumber,
  reaccountNumber,
  error,
  setError,
  hideAccountNumber,
  setHideAccountNumber,
}) {
  const handleReEnterAccountNumberChange = (e) => {
    const value = e.target.value;
    if (formdata.accountNumber == value) {
      setHideAccountNumber(false);
    } else {
      setHideAccountNumber(true);
    }
    setreaccountNumber(value);
    setError("");
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <label className="text-xs font-bold p-1">
            Bank Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput onChange={(e) => handleInputChange(e, "bankName")} value={formdata.bankName} />
          {submitted.activeStep3 && !formdata.bankName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Bank Name
            </span>
          )}
        </Grid>
        <Grid item xs={6}>
          <label className="text-xs font-bold p-1">
            IFSC Code<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput onChange={(e) => handleInputChange(e, "ifscCode")} value={formdata.ifscCode} />
          {submitted.activeStep3 && !formdata.ifscCode && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter IFSC Code
            </span>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <label className="text-xs font-bold p-1">
            Account Number<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            type={hideAccountNumber ? "password" : "text"}
            onChange={(e) => handleInputChange(e, "accountNumber")}
            value={formdata.accountNumber}
          />
          {submitted.activeStep3 && !formdata.accountNumber && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Account Number
            </span>
          )}
        </Grid>
        <Grid item xs={6}>
          <label className="text-xs font-bold p-1">
            Re-Enter Account Number<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput onChange={handleReEnterAccountNumberChange} value={reaccountNumber} />
          {error && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              {error}
            </span>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <label className="text-xs font-bold p-1">
          Account Holder Name<span style={{ color: "red" }}>*</span>
        </label>
        <SoftInput
          onChange={(e) => handleInputChange(e, "accountHolderName")}
          value={formdata.accountHolderName}
        />
        {submitted.activeStep3 && !formdata.accountHolderName && (
          <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
            Please Enter AccountHolder Name
          </span>
        )}
      </Grid>
    </div>
  );
}

export default Bank;
