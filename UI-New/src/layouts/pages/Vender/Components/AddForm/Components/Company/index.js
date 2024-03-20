/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function Company({ formdata, handleInputChange, submitted }) {
  console.log("formdata", formdata);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            First Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "firstName")}
            value={formdata.firstName}
          />
          {submitted.activeStep1 && !formdata.firstName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter First Name
            </span>
          )}
        </Grid>

        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Middle Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "middleName")}
            value={formdata.middleName}
          />
          {submitted.activeStep1 && !formdata.middleName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Middle Name
            </span>
          )}
        </Grid>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Last Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput onChange={(e) => handleInputChange(e, "lastName")} value={formdata.lastName} />
          {submitted.activeStep1 && !formdata.lastName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Last Name
            </span>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Company Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "companyName")}
            value={formdata.companyName}
          />
          {submitted.activeStep1 && !formdata.companyName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Company Name
            </span>
          )}
        </Grid>

        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Company Email<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "companyEmail")}
            value={formdata.companyEmail}
          />
          {submitted.activeStep1 && !formdata.companyEmail && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Company Email
            </span>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Display Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "displayName")}
            value={formdata.displayName}
          />
          {submitted.activeStep1 && !formdata.displayName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Display Name
            </span>
          )}
        </Grid>

        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Mobile Number<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "mobileNumber")}
            value={formdata.mobileNumber}
          />
          {submitted.activeStep1 && !formdata.mobileNumber && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Mobile Number
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Company;
