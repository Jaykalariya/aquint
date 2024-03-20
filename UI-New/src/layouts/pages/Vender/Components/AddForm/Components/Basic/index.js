/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function Basic({ formdata, handleInputChange, submitted }) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            First Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "contactPersonFirstName")}
            value={formdata.contactPersonFirstName}
          />
          {submitted.activeStep2 && !formdata.contactPersonFirstName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter FirstName
            </span>
          )}
        </Grid>

        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Middle Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "contactPersonMiddleName")}
            value={formdata.contactPersonMiddleName}
          />
          {submitted.activeStep2 && !formdata.contactPersonMiddleName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Middle Name
            </span>
          )}
        </Grid>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Last Name<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "contactPersonLastName")}
            value={formdata.contactPersonLastName}
          />
          {submitted.activeStep2 && !formdata.contactPersonLastName && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Last Name
            </span>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Mobile Number<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "contactPersonMobileNumber")}
            value={formdata.contactPersonMobileNumber}
          />
          {submitted.activeStep2 && !formdata.contactPersonMobileNumber && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Mobile Number
            </span>
          )}
        </Grid>

        <Grid item xs={4}>
          <label className="text-xs font-bold p-1">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <SoftInput
            onChange={(e) => handleInputChange(e, "contactPersonEmail")}
            value={formdata.contactPersonEmail}
          />
          {submitted.activeStep2 && !formdata.contactPersonEmail && (
            <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
              Please Enter Email
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Basic;
