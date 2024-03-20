/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

import Company from "./Components/Company";
import Basic from "./Components/Basic";
import Bank from "./Components/Bank";
import axiosInstance from "config/https";
import { useToasts } from "react-toast-notifications";
import { result } from "lodash";

function getSteps() {
  return ["Company", "Contact Person", "Bank"];
}

function Updateform({ fetchData, sethide, selecteddata }) {
  const { addToast } = useToasts();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(selecteddata);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;
  const [submitted, setSubmitted] = useState({
    activeStep1: false,
    activeStep2: false,
    activeStep3: false,
  });
  const token = localStorage.getItem("token");
  const [reaccountNumber, setreaccountNumber] = useState(formData.accountNumber);
  const [error, setError] = useState("");

  const handleNext = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (activeStep === 0) {
      setSubmitted({
        activeStep1: true,
        activeStep2: false,
        activeStep3: false,
      });
      if (
        !formData.firstName ||
        !formData.middleName ||
        !formData.lastName ||
        !formData.companyName ||
        !formData.companyEmail ||
        !formData.companyName ||
        !formData.mobileNumber
      ) {
        return;
      }
      if (!emailRegex.test(formData.companyEmail)) {
        addToast("Invalid company email format", { appearance: "error" });
        return;
      }
      if (formData.mobileNumber.toString().length !== 10) {
        addToast("Mobile number must be 10 digits long", { appearance: "error" });
        return;
      }
    }
    if (activeStep === 1) {
      setSubmitted({
        activeStep1: true,
        activeStep2: true,
        activeStep3: false,
      });

      if (
        !formData.contactPersonFirstName ||
        !formData.contactPersonMiddleName ||
        !formData.contactPersonLastName ||
        !formData.contactPersonMobileNumber ||
        !formData.contactPersonEmail
      ) {
        return;
      }

      if (formData.contactPersonMobileNumber.toString().length !== 10) {
        addToast("Mobile number must be 10 digits long", { appearance: "error" });
        return;
      }

      if (!emailRegex.test(formData.contactPersonEmail)) {
        addToast("Invalid company email format", { appearance: "error" });
        return;
      }
    }

    if (isLastStep) {
      setSubmitted({
        activeStep1: true,
        activeStep2: true,
        activeStep3: true,
      });
      if (
        !formData.bankName ||
        !formData.ifscCode ||
        !formData.accountNumber ||
        !formData.accountHolderName
      ) {
        return;
      }

      if (formData.accountNumber === reaccountNumber) {
      } else {
        setError("Account numbers do not match. Please try again.");
        return;
      }

      try {
        const response = await axiosInstance.post(`/_v1/vendor/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          addToast("Your Record Has Been Successfully Added", { appearance: "success" });
          fetchData();
          sethide(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        addToast("Failed to add qualification. Please try again later.", { appearance: "error" });
        return;
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    if (field === "accountNumber") {
      if (!isNaN(value)) {
        value = parseFloat(value);
      } else {
        value = "";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <SoftBox pt={3} pb={8}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Card>
            <SoftBox p={2}>
              <SoftBox>
                {activeStep === 0 && (
                  <Company
                    handleInputChange={handleInputChange}
                    formdata={formData}
                    submitted={submitted}
                  />
                )}
                {activeStep === 1 && (
                  <Basic
                    handleInputChange={handleInputChange}
                    formdata={formData}
                    submitted={submitted}
                  />
                )}
                {activeStep === 2 && (
                  <Bank
                    handleInputChange={handleInputChange}
                    formdata={formData}
                    submitted={submitted}
                    setreaccountNumber={setreaccountNumber}
                    reaccountNumber={reaccountNumber}
                    error={error}
                    setError={setError}
                  />
                )}
                <SoftBox mt={3} width="100%" display="flex" justifyContent="space-between">
                  {activeStep === 0 ? (
                    <SoftBox />
                  ) : (
                    <SoftButton variant="gradient" color="light" onClick={handleBack}>
                      Back
                    </SoftButton>
                  )}
                  <SoftButton variant="gradient" color="dark" onClick={handleNext}>
                    {isLastStep ? "Send" : "Next"}
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Updateform;
