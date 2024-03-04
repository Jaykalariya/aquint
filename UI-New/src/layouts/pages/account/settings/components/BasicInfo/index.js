/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftTagInput from "components/SoftTagInput";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";
import SoftInput from "components/SoftInput";
import SoftDatePicker from "components/SoftDatePicker";
import axiosInstance from "config/https";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import SoftButton from "components/SoftButton";
import { useToasts } from "react-toast-notifications";
import initialValues from "layouts/pages/users/new-user/schemas/initialValues";

function BasicInfo() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const defaultId = JSON.parse(localStorage.getItem("userProfile")).id;
  const userId = id || defaultId;

  const [skills, setSkills] = useState(["react", "angular"]);
  const [firstname, setFirstName] = useState(null);
  const [middlename, setMiddleName] = useState(null);
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [address, setAddress] = useState(null);
  const [maritalStatus, setmaritalStatus] = useState(null);
  const [religion, setReligion] = useState(null);
  const [nationality, setNationality] = useState(null);

  const [nameError, setnameError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  


  const navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    fetchData();
  }, [userId]);
  // useEffect(() => {
  //   // Check if the current values match the initial values
  //   const hasChanges = Object.keys(initialValues).some(
  //     key => initialValues[key] !== eval(key) // eval is used to dynamically get the current value
  //   );
  //   console.log(hasChanges);
  //   console.log(isModified);

  //   setIsModified(hasChanges);
  // }, [firstname, middlename, lastname, mobileNumber, gender, email, birthDate, anniversaryDate, bloodGroup, address, maritalStatus, religion, nationality]);

  const postData = async () => {
    try {
      const result = await axiosInstance.post(
        `_v1/user/details/add`,
        {
          id: user.id,
          userId: user.userId,
          firstname: firstname,
          middlename: middlename,
          lastname: lastname,
          email: email,
          mobileNumber: mobileNumber,
          birthDate: birthDate,
          gender: gender,
          bloodGroup: bloodGroup,
          maritalStatus: maritalStatus,
          anniversaryDate: anniversaryDate,
          nationality: nationality,
          religion: religion,
          address: address,
          imageUrl: user.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        fetchData();
        return true;
      } else {
        console.error("Error adding user. Unexpected response:", result);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`_v1/user/userBasicInfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
      setFirstName(result.data.firstname);
      setMiddleName(result.data.middlename);
      setLastName(result.data.lastname);
      setEmail(result.data.email);
      setGender(result.data.gender);
      setBirthDate(result.data.birthDate);
      setMobileNumber(result.data.mobileNumber);
      setAnniversaryDate(result.data.anniversaryDate);
      setBloodGroup(result.data.bloodGroup);
      setAddress(result.data.address);
      setmaritalStatus(result.data.maritalStatus);
      setReligion(result.data.religion);
      setNationality(result.data.nationality);
    } catch (error) {
      console.error(error);
    }
  };

  const [isModified, setIsModified] = useState(false);

  // Function to set the modified state
  const setModified = () => {
    if (!isModified) {
      setIsModified(true);
    }
  };

  const handlefirstnameChange = (event) => {
    setModified();
    setFirstName(event.target.value);
    setFirstnameError(false);
  };

  const handlemiddlenameChange = (event) => {
    setModified();
    setMiddleName(event.target.value);
  };

  const handlelastnameChange = (event) => {
    setModified();
    setLastName(event.target.value);
    setLastnameError(false);
  };

  const handleMobileNumber = (event) => {
    setModified();
    setMobileNumber(event.target.value);
    console.log(mobileNumber);
  };

  const handleGender = (event) => {
    setModified();
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError(true);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBirthDateChange = (date) => {
    setModified();
    setBirthDate(date);
    console.log(date);
    console.log(birthDate);
  };

  const handleAnniversaryDateChange = (date) => {
    setModified();
    setAnniversaryDate(date);
  };

  const handleBloodGroupChange = (event) => {
    setModified();
    setBloodGroup(event.target.value);
  };

  const handleAddressChange = (event) => {
    setModified();
    setAddress(event.target.value);
  };

  const handleMaritalStatusChange = (event) => {
    setModified();
    setmaritalStatus(event.target.value);
  };

  const handleReligionChange = (event) => {
    setModified();
    setReligion(event.target.value);
  };

  const handleNationalityChange = (event) => {
    setModified();
    setNationality(event.target.value);
  };

  const handleFieldBlur = async (fieldName) => {
    switch (fieldName) {
      case "firstname":
        if (firstname === "") {
          setFirstnameError(true);
        }
        break;
      case "lastname":
        if (lastname === "") {
          setLastnameError(true);
        }
        break;
      case "email":
        if (email === "" || !isValidEmail(email)) {
          setEmailError(true);
          setemailErrorMessage(false);
        } else {
          try {
            const response = await axiosInstance.post(`/existedCredential/email/${email}`);
            console.log(response.data);
            setIsEmailValid(response.data !== true);
            if (response.data === true) {
              setemailErrorMessage(true);
            } else {
              setemailErrorMessage(false);
            }
          } catch (error) {
            console.error(error);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    let hasError = false;

    if (firstname === "") {
      setFirstnameError(true);
      hasError = true;
    }
    if (lastname === "") {
      setLastnameError(true);
      hasError = true;
    }

    if (email === "") {
      setEmailError(true);
      hasError = true;
    }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    if (postData()) {
      addToast("User update successful!", {
        appearance: "success",
      });
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }

    setIsModified(false); // Reset the modified state after saving
  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Basic Info</SoftTypography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <div className="flex" style={{ width: "100%" }}>
          <div className="ml-4 mr-4" style={{ width: "33%" }}>
            <label className="text-xs font-bold p-1">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={firstname}
              onBlur={() => handleFieldBlur("firstname")}
              onChange={handlefirstnameChange}
              // onBlur={() => handleFieldBlur("firstname")}
              // style={{ borderColor: firstnameError ? "red" : "", width: "100%" }}
            />
            {firstnameError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please enter firstname</span>
            )}
          </div>
          <div style={{ width: "33%" }}>
            <label className="text-xs font-bold p-1">Middle Name</label>
            <SoftInput
              value={middlename}
              onChange={handlemiddlenameChange}

              // onChange={handlemiddlenameChange}
            />
          </div>
          <div className="ml-4 " style={{ width: "33%" }}>
            <label className="text-xs font-bold p-1">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={lastname}
              onChange={handlelastnameChange}
              onBlur={() => handleFieldBlur("lastname")}
              style={{ borderColor: lastnameError ? "red" : "" }}
            />
            {lastnameError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please enter lastname</span>
            )}
          </div>
        </div>

        <div className="ml-4" style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SoftBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
              >
                <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Mobile no.
                  </SoftTypography>
                </SoftBox>
                <SoftInput value={mobileNumber} onChange={handleMobileNumber} />
              </SoftBox>
            </Grid>

            <Grid item xs={7.75}>
              <SoftBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
              >
                <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email <span style={{ color: "red" }}>*</span>
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  onChange={handleEmailChange}
                  onBlur={() => handleFieldBlur("email")}
                  value={email}
                  style={{
                    borderColor: emailError || emailErrorMessage ? "red" : "",
                    borderWidth: emailError || emailErrorMessage ? "2px" : "1px",
                  }}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </div>

        <div
          className="ml-4 "
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "30%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Gender
                </SoftTypography>
              </SoftBox>
              <Select input={<SoftInput />} value={gender} onChange={handleGender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </SoftBox>
          </div>
          <div style={{ width: "30%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Date of Birth
                </SoftTypography>
              </SoftBox>
              <div style={{ borderRadius: "1px", borderColor: "black" }}>
                <DatePicker
                  selected={birthDate}
                  onChange={handleBirthDateChange}
                  className="custom-datepicker"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </SoftBox>
          </div>
          <div className="mr-4" style={{ width: "30%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Anniversary Date
                </SoftTypography>
              </SoftBox>
              <div style={{ borderRadius: "1px", borderColor: "black" }}>
                <DatePicker
                  selected={anniversaryDate}
                  onChange={handleAnniversaryDateChange}
                  className="custom-datepicker"
                  dateFormat="dd/MM/yyyy"
                />
              </div>{" "}
            </SoftBox>
          </div>
        </div>
        <div
          className="ml-4 "
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "25%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Marital Status
                </SoftTypography>
              </SoftBox>
              <Select
                input={<SoftInput />}
                value={maritalStatus}
                onChange={handleMaritalStatusChange}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </Select>
            </SoftBox>
          </div>

          <div style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Blood group
                </SoftTypography>
              </SoftBox>
              <Select value={bloodGroup} onChange={handleBloodGroupChange}>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </SoftBox>
          </div>

          <div style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Religion
                </SoftTypography>
              </SoftBox>
              <Select
                value={religion}
                onChange={handleReligionChange}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  borderColor: "#ced4da",
                  borderWidth: "1px",
                  padding: "8px",
                }}
              >
                <MenuItem value="Hindu">Hindu</MenuItem>
                <MenuItem value="Christian">Christian</MenuItem>
                <MenuItem value="Muslim">Muslim</MenuItem>
                <MenuItem value="Buddhist">Buddhist</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </SoftBox>
          </div>

          <div className="mr-4" style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Nationality
                </SoftTypography>
              </SoftBox>
              <Select
                value={nationality}
                onChange={handleNationalityChange}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  borderColor: "#ced4da",
                  borderWidth: "1px",
                  padding: "8px",
                }}
              >
                <MenuItem value="Indian">Indian</MenuItem>

                {/* Add more options as needed */}
              </Select>
            </SoftBox>
          </div>
        </div>
        <div
          className="mr-4 ml-4"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column", // Set to column to widen vertically
          }}
        >
          <SoftBox
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            height="100%"
            style={{ width: "100%" }}
          >
            <div className="mr-4">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Address
                </SoftTypography>
              </SoftBox>
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  borderRadius: "8px",
                  borderColor: "#ced4da",
                  borderWidth: "1px",
                  padding: "8px", //
                  resize: "vertical",
                  overflowX: "hidden",
                  fontSize: "14px",
                }}
                onChange={handleAddressChange}
                value={address}
              />
            </div>
          </SoftBox>
          {isModified && (
            <div className="flex justify-end gap-2 mr-4 mt-3 mb-3">
              <SoftButton color="info" onClick={() => handleSave()}>
                Update
              </SoftButton>
            </div>
          )}
        </div>
      </SoftBox>
    </Card>
  );
}

export default BasicInfo;
