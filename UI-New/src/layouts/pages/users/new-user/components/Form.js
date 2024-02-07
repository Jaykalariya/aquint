import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import { useToasts } from "react-toast-notifications";
import { Divider, Grid, MenuItem, Select } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Service from "./Update/Service";
import axiosInstance from "config/https";
import _ from "lodash";

// eslint-disable-next-line react/prop-types
const Forms = ({ setShow, fetchData }) => {
  const [name, setname] = useState(null);
  const [firstname, setfirstname] = useState(null);
  const [middlename, setmiddlename] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [status, setstatus] = useState(null);
  const [role, setrole] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  // const [status, setStatus] = useState(null);
  const [nameError, setnameError] = useState(false);
  const [firstnameError, setfirstnameError] = useState(false);
  const [lastnameError, setlastnameError] = useState(false);
  const [usernameError, setusernameError] = useState(false);
  const [usernameErrorMessage, setusernameErrorMessage] = useState(false);
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [roleError, setroleError] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  // const [statusError, setStatusError] = useState(false);
  const { addToast } = useToasts();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/_v1/role/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log(data);
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handlefirstnameChange = (event) => {
    setfirstname(event.target.value);
    setfirstnameError(false);
  };
  const handlemiddlenameChange = (event) => {
    setmiddlename(event.target.value);
  };
  const handlelastnameChange = (event) => {
    setlastname(event.target.value);
    setlastnameError(false);
  };
  const handleusernameChange = async (event) => {
    const newusername = event.target.value;
    setusername(newusername);
    setusernameError(false);

    // Add a check to avoid calling API when the username is null or empty
    if (!newusername) {
      setIsUsernameValid(null);
      setusernameError(true);
      return;
    }
  };
  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption);
    setStatusError(false);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
    setemailError(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setemailError(true);
    }
  };
  const handleRoleChange = (event) => {
    const selectedRoles = event.target.value;
    setrole(selectedRoles);
    setroleError(selectedRoles.length === 0);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // const handleStatusChange = (selectedOption) => {
  //   setStatus(selectedOption);
  //   setStatusError(false);
  // };
  const handleCancel = () => {
    setShow(false);
  };
  const handleFieldBlur = async (fieldName) => {
    switch (fieldName) {
      case "firstname":
        if (firstname === null) {
          setfirstnameError(true);
        }
        break;
      case "lastname":
        if (lastname === null) {
          setlastnameError(true);
        }
        break;
      case "username":
        if (username === null || username === "") {
          setusernameError(true);
          setIsUsernameValid(null);
          return;
        } else {
          try {
            const response = await axiosInstance.post(`/existedCredential/username/${username}`);
            console.log(response.data);
            setIsUsernameValid(response.data !== true);
            if (response.data === true) {
              setusernameErrorMessage(true);
            } else {
              setusernameErrorMessage(false);
            }
          } catch (error) {
            console.error(error);
          }
        }
        break;
      case "email":
        if (email === null || !isValidEmail(email)) {
          setemailError(true);
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
      case "role":
        if (role.length === 0) {
          setroleError(true);
        }
        break;
      default:
        break;
    }
  };
  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;
    if (firstname === null) {
      setfirstnameError(true);
      hasError = true;
    }
    if (lastname === null) {
      setlastnameError(true);
      hasError = true;
    }
    if (username === null) {
      setusernameError(true);
      hasError = true;
    }
    if (email === null) {
      setemailError(true);
      hasError = true;
    }
    if (role.length === 0) {
      setroleError(true);
      hasError = true;
    }
    if (status === null) {
      setStatusError(true);
      hasError = true;
    }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }
    console.log(firstname, middlename, lastname, username, email, [role]);
    // const parsedStatus = status.value === "true";
    const result = await Service(firstname, middlename, lastname, username, email, [role]);
    if (result) {
      addToast("User added successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
      fetchData();
      setShow(false);
    }
  };
  return (
    <Card
      className="mx-auto mb-24 pl-10 pr-10 "
      style={{ container: (base) => ({ ...base, zIndex: 999 }), width: "650px" }}
    >
      <SoftBox p={2}>
        <SoftBox>
          <SoftTypography variant="h6" fontWeight="medium">
            New User
          </SoftTypography>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Create new user
          </SoftTypography>
          <Divider />
          <label className="text-xs font-bold p-1">
            Username <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <div style={{ position: "relative" }}>
            <SoftInput
              onChange={handleusernameChange}
              onBlur={() => handleFieldBlur("username")}
              style={{
                borderColor:
                  isUsernameValid === true
                    ? "green"
                    : usernameError || usernameErrorMessage
                    ? "red"
                    : "",
                borderWidth: isUsernameValid === true ? "2px" : "1px",
                width: "80%",
              }}
            />
            {isUsernameValid === true && (
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "green",
                }}
              >
                &#10004; {/* Unicode checkmark character */}
              </span>
            )}
          </div>
          {usernameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please enter valid username</span>
          )}
          {usernameErrorMessage && (
            <span style={{ color: "red", fontSize: "12px" }}>Username unavailable</span>
          )}
          <div className="flex">
            <div className="mr-4" style={{ width: "33%" }}>
              <label className="text-xs font-bold p-1">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                onChange={handlefirstnameChange}
                onBlur={() => handleFieldBlur("firstname")}
                style={{ borderColor: firstnameError ? "red" : "", width: "100%" }}
              />
              {firstnameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter firstname</span>
              )}
            </div>
            <div style={{ width: "33%" }}>
              <label className="text-xs font-bold p-1">Middle Name</label>
              <SoftInput onChange={handlemiddlenameChange} />
            </div>
            <div className="ml-4 " style={{ width: "33%" }}>
              <label className="text-xs font-bold p-1">
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <SoftInput
                onChange={handlelastnameChange}
                onBlur={() => handleFieldBlur("lastname")}
                style={{ borderColor: lastnameError ? "red" : "" }}
              />
              {lastnameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter lastname</span>
              )}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold p-1">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <SoftInput
                onChange={handleEmailChange}
                onBlur={() => handleFieldBlur("email")}
                style={{
                  borderColor:
                    isEmailValid === true ? "green" : emailError || emailErrorMessage ? "red" : "",
                  borderWidth: isEmailValid === true ? "2px" : "1px",
                  width: "80%",
                }}
              />
              {isEmailValid === true && (
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "green",
                  }}
                >
                  &#10004; {/* Unicode checkmark character */}
                </span>
              )}
            </div>
            {emailError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please enter email</span>
            )}
            {emailErrorMessage && (
              <span style={{ color: "red", fontSize: "12px" }}>Email unavailable</span>
            )}
          </div>
          <label className="text-xs font-bold ">
            Status <span style={{ color: "red" }}>*</span>
          </label>
          <SoftSelect
            onChange={handleStatusChange}
            value={status}
            placeholder="Select Satus"
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
          {statusError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please select a Status</span>
          )}

          <Grid item xs={6} sm={3}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Role <span style={{ color: "red" }}>*</span>
              </SoftTypography>
            </SoftBox>
            <Select
              input={<SoftInput />}
              value={role}
              onChange={handleRoleChange}
              onBlur={() => handleFieldBlur("role")}
              style={{ borderColor: roleError ? "red" : "" }}
              disabled={loadingRoles}
            >
              {roles.map((roleOption) => (
                <MenuItem key={roleOption.ID} value={roleOption.id}>
                  {roleOption.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {roleError && <span style={{ color: "red", fontSize: "12px" }}>Please enter a role</span>}

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
