import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import { useToasts } from "react-toast-notifications";
import { Grid, MenuItem, Select } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Service from "./Update/Service";
import axiosInstance from "config/https";

// eslint-disable-next-line react/prop-types
const Forms = ({ setShow, fetchData }) => {
  const [name, setname] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [middleName, setmiddleName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [userName, setuserName] = useState(null);
  const [email, setemail] = useState(null);
  const [role, setrole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  // const [status, setStatus] = useState(null);
  const [nameError, setnameError] = useState(false);
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [userNameError, setuserNameError] = useState(false);
  const [userNameErrorMessage, setuserNameErrorMessage] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [roleError, setroleError] = useState(false);
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

  
  const handlefirstNameChange = (event) => {
    setfirstName(event.target.value);
    setfirstNameError(false);
  };
  const handlemiddleNameChange = (event) => {
    setmiddleName(event.target.value);
  };
  const handlelastNameChange = (event) => {
    setlastName(event.target.value);
    setlastNameError(false);
  };
  const handleUserNameChange = async (event) => {
    const newUsername = event.target.value;
    setuserName(newUsername);
    setuserNameError(false);
    try {
      const response = await fetch(`/existedCredential/userName/${newUsername}`);
      const result = await response.json();
      if (!result.available) {
        setuserNameErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
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
    setrole(event.target.value);
    setroleError(false);
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
  const handleFieldBlur = (fieldName) => {
    switch (fieldName) {
      case "firstName":
        if (firstName === null) {
          setfirstNameError(true);
        }
        break;
      case "lastName":
        if (lastName === null) {
          setlastNameError(true);
        }
        break;
      case "userName":
        if (userName === null) {
          setuserNameError(true);
        }
        break;
      case "email":
        if (email === null || !isValidEmail(email)) {
          setemailError(true);
        }
        break;
      case "role":
        if (role === null) {
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
    if (firstName === null) {
      setfirstNameError(true);
      hasError = true;
    }
    if (lastName === null) {
      setlastNameError(true);
      hasError = true;
    }
    if (userName === null) {
      setuserNameError(true);
      hasError = true;
    }
    if (email === null) {
      setemailError(true);
      hasError = true;
    }
    if (role === null) {
      setroleError(true);
      hasError = true;
    }
    // if (status === null) {
    //   setStatusError(true);
    //   hasError = true;
    // }
    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }
    // const parsedStatus = status.value === "true";
    const result = await Service(firstName, middleName, lastName, userName, email, role);
    if (result === true) {
      addToast("User added successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };
  return (
    <Card className="mx-24" style={{ container: (base) => ({ ...base, zIndex: 999 }) }}>
      <SoftBox p={1.8}>
        <SoftBox>
          <div className="flex">
            <div className="mr-4" style={{ width: "50%" }}>
              <label className="text-xs font-bold p-1">First Name</label>
              <SoftInput
                onChange={handlefirstNameChange}
                onBlur={() => handleFieldBlur("firstName")}
                style={{ borderColor: firstNameError ? "red" : "", width: "100%" }}
              />
              {firstNameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter firstname</span>
              )}
            </div>
            <div style={{ width: "50%" }}>
              <label className="text-xs font-bold p-1">Middle Name</label>
              <SoftInput onChange={handlemiddleNameChange} />
            </div>
          </div>
          <div className="flex">
            <div className="mr-4" style={{ width: "50%" }}>
              <label className="text-xs font-bold p-1">Last Name</label>
              <SoftInput
                onChange={handlelastNameChange}
                onBlur={() => handleFieldBlur("lastName")}
                style={{ borderColor: lastNameError ? "red" : "" }}
              />
              {lastNameError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter lastname</span>
              )}
            </div>
            <div style={{ width: "50%" }}>
              <label className="text-xs font-bold p-1">Email</label>
              <SoftInput
                onChange={handleEmailChange}
                onBlur={() => handleFieldBlur("email")}
                style={{ borderColor: emailError ? "red" : "" }}
              />
              {emailError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter email</span>
              )}
            </div>
          </div>
          <label className="text-xs font-bold p-1">Username</label>
          <SoftInput
            onChange={handleUserNameChange}
            onBlur={() => handleFieldBlur("userName")}
            style={{ borderColor: userNameError || userNameErrorMessage ? "red" : "" }}
          />
          {userNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please enter valid username</span>
          )}{userNameErrorMessage && (
            <span style={{ color: "red", fontSize: "12px" }}>Username Unavailable</span>
          )}
          <Grid item xs={6} sm={3}>
            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SoftTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Role
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
          {roleError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please enter a role</span>
              )}
          <br />
          {/* <div>
            <label className="text-xs font-bold p-1">Status</label>
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
          </div> */}
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