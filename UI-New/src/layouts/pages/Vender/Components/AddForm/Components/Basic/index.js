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
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                First Name<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "contactPersonFirstName")}
              value={formdata.contactPersonFirstName}
            />
            {submitted.activeStep2 && !formdata.contactPersonFirstName && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter FirstName
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
              onChange={(e) => handleInputChange(e, "contactPersonMiddleName")}
              value={formdata.contactPersonMiddleName}
            />
            {submitted.activeStep2 && !formdata.contactPersonMiddleName && (
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
              onChange={(e) => handleInputChange(e, "contactPersonLastName")}
              value={formdata.contactPersonLastName}
            />
            {submitted.activeStep2 && !formdata.contactPersonLastName && (
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
                Mobile Number<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "contactPersonMobileNumber")}
              value={formdata.contactPersonMobileNumber}
            />
            {submitted.activeStep2 && !formdata.contactPersonMobileNumber && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Mobile Number
              </span>
            )}
          </SoftBox>
        </Grid>

        <Grid item xs={4}>
          <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email<span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <SoftInput
              onChange={(e) => handleInputChange(e, "contactPersonEmail")}
              value={formdata.contactPersonEmail}
            />
            {submitted.activeStep2 && !formdata.contactPersonEmail && (
              <span style={{ color: "red", fontSize: "12px" }} className="mt-1.5">
                Please Enter Email
              </span>
            )}
          </SoftBox>
        </Grid>
      </Grid>
    </div>
  );
}

export default Basic;
