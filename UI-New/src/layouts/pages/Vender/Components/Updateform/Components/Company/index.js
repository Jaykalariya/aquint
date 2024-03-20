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
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                First Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "firstName")}
              value={formdata.firstName}
            />
            {submitted.activeStep1 && !formdata.firstName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter First Name
              </span>
            )}
          </SoftBox>
        </Grid>

        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Middle Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "middleName")}
              value={formdata.middleName}
            />
            {submitted.activeStep1 && !formdata.middleName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Middle Name
              </span>
            )}
          </SoftBox>
        </Grid>
        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Last Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "lastName")}
              value={formdata.lastName}
            />
            {submitted.activeStep1 && !formdata.lastName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Last Name
              </span>
            )}
          </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Company Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "companyName")}
              value={formdata.companyName}
            />
            {submitted.activeStep1 && !formdata.companyName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Company Name
              </span>
            )}
          </SoftBox>
        </Grid>

        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Company Email<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "companyEmail")}
              value={formdata.companyEmail}
            />
            {submitted.activeStep1 && !formdata.companyEmail && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Company Email
              </span>
            )}
          </SoftBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Display Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "displayName")}
              value={formdata.displayName}
            />
            {submitted.activeStep1 && !formdata.displayName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Display Name
              </span>
            )}
          </SoftBox>
        </Grid>

        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Mobile Number<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "mobileNumber")}
              value={formdata.mobileNumber}
            />
            {submitted.activeStep1 && !formdata.mobileNumber && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Mobile Number
              </span>
            )}
          </SoftBox>
        </Grid>
      </Grid>
    </div>
  );
}

export default Company;
