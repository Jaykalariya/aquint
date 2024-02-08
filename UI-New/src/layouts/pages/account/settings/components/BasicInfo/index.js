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

import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

function BasicInfo() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const defaultId = JSON.parse(localStorage.getItem("userProfile")).id;
  const userId = id || defaultId;

  const [skills, setSkills] = useState(["react", "angular"]);
  const [firstname, setFirstName] = useState(null);
  const [middlename, setMiddleName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [address, setAddress] = useState(null);
  const [martitalStatus, setmaritalStatus] = useState(null);
  const [religion, setReligion] = useState(null);
  const [nationality, setNationality] = useState(null);

  
  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`_v1/user/userBasicInfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
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

  const handlefirstnameChange = (event) => {
    setFirstName(event.target.value);
    
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
            onChange={handlefirstnameChange}
            // onBlur={() => handleFieldBlur("firstname")}
            // style={{ borderColor: firstnameError ? "red" : "", width: "100%" }}
            />
            {/* {firstnameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter firstname</span>
              )} */}
          </div>
          <div style={{ width: "33%" }}>
            <label className="text-xs font-bold p-1">Middle Name</label>
            <SoftInput
            value={middlename}
            // onChange={handlemiddlenameChange}
            />
          </div>
          <div className="ml-4 " style={{ width: "33%" }}>
            <label className="text-xs font-bold p-1">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            value={lastname}
            // onChange={handlelastnameChange}
            // onBlur={() => handleFieldBlur("lastname")}
            // style={{ borderColor: lastnameError ? "red" : "" }}
            />
            {/* {lastnameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter lastname</span>
              )} */}
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
                <SoftInput
                value={mobileNumber}
                // onChange={handlemiddlenameChange}
                />
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
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput value={email}/>
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
              <SoftSelect
                // onChange={handleStatusChange}
                value={gender}
                placeholder="Select Gender"
                options={[
                  { value: "true", label: "Male" },
                  { value: "false", label: "Female" },
                ]}
              />
            </SoftBox>
          </div>
          <div style={{ width: "30%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Date of Birth
                </SoftTypography>
              </SoftBox>
              <SoftDatePicker value={birthDate}/>
            </SoftBox>
          </div>
          <div className="mr-4" style={{ width: "30%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Anniversary Date
                </SoftTypography>
              </SoftBox>
              <SoftDatePicker value={anniversaryDate}/>
            </SoftBox>
          </div>
        </div>
        <div
          className="ml-4 "
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Marital Status
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                // onChange={handleStatusChange}
                value={martitalStatus}
                placeholder="Select"
                options={[
                  { value: "Single", label: "Single" },
                  { value: "Married", label: "Married" },
                ]}
              />
            </SoftBox>
          </div>

          <div style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Blood group
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                // onChange={handleStatusChange}
                value={bloodGroup}
                placeholder="Select"
                options={[
                  { value: "O+", label: "O+" },
                  { value: "O-", label: "O-" },
                  { value: "A+", label: "A+" },
                  { value: "A-", label: "A-" },
                  { value: "B+", label: "B+" },
                  { value: "B-", label: "B-" },
                  { value: "AB+", label: "AB+" },
                  { value: "AB-", label: "AB-" },
                ]}
              />
            </SoftBox>
          </div>

          <div style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Religion
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                // onChange={handleStatusChange}
                value={religion}
                placeholder="Select"
                options={[{ value: "Hindu", label: "Hindu" }]}
              />
            </SoftBox>
          </div>

          <div className="mr-4" style={{ width: "20%" }}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Nationality
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                // onChange={handleStatusChange}
                value={nationality}
                placeholder="Select"
                options={[{ value: "India", label: "India" }]}
              />
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
                }}
              />
            </div>
          </SoftBox>
        </div>

        {/* <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      I&apos;m
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect placeholder="Male" options={selectData.gender} />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SoftTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          birth date
                        </SoftTypography>
                      </SoftBox>
                      <SoftSelect placeholder="February" options={selectData.birthDate} />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftSelect placeholder={1} options={selectData.days} />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftSelect placeholder={2021} options={selectData.years} />
                    </SoftBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
        {/* <Grid item xs={12} sm={6}>
            <FormField
              label="email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your location" placeholder="Sydney, A" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField label="language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftTagInput
                tags={skills}
                placeholder=" "
                onChange={(newSkill) => setSkills(newSkill)}
                removeOnBackspace
              />
            </SoftBox>
          </Grid> */}
      </SoftBox>
    </Card>
  );
}

export default BasicInfo;
