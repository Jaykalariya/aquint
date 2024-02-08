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

// react-router-dom components
import {useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import chat from "assets/images/illustrations/chat.png";
import AuthService from "./AuthService";
import axiosInstance from "config/https";
import { useToasts } from "react-toast-notifications";

function Illustration() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  useEffect(()=>{
    let login = localStorage.getItem('token',true)
    if(login){
      navigate('/dashboard')
    }
  })

  const handleLogin = async () => {
    try {
      const result = await AuthService(username, password);
      const token = result.accessToken;
      const id = result.id;

      if (token) {
        addToast("Login successful!", {
          appearance: "success",
        });
        const users = await axiosInstance.get(`/_v1/user/getUserDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("userProfile", JSON.stringify(users.data));
        navigate("/dashboard");
      }
    } catch (error) {
      addToast("Login failed. Please try again.", { appearance: "error" });
      console.error("Login failed:", error);
    }
  };

  const handleSignInClick = () => {
    // Check if both username and password are not empty before calling handleLogin
    if (username.trim() !== "" && password.trim() !== "") {
      handleLogin();
    } else {
      addToast("Please enter both Username and Password.", { appearance: "error" });
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus on the password input when "Enter" is pressed in the email field
      passwordInputRef.current.focus();
    }
  };

  return (
    <IllustrationLayout
      title="Sign In"
      illustration={{
        image: chat,
        title: '"INFRATELE INDIA PVT LTD"',
        description: "“Growing Exponentially With Developing People”",
      }}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftInput
            type="email"
            placeholder="Email"
            size="large"
            ref={passwordInputRef}
            onChange={(e) => setusername(e.target.value)}
            onKeyDown={handleEmailKeyDown}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            onChange={(e) => setpassword(e.target.value)}
        
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSignInClick(); // Call your sign-in action
              }
            }}
            type="password"
            placeholder="Password"
            size="large"
          />
        </SoftBox>
        {/* <SoftBox display="flex" alignItems="center">
      <Switch checked={rememberMe} onChange={handleSetRememberMe} />
      <SoftTypography
        variant="button"
        fontWeight="regular"
        onClick={handleSetRememberMe}
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        &nbsp;&nbsp;Remember me
      </SoftTypography>
    </SoftBox> */}
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={handleSignInClick} variant="gradient" color="info" size="large" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        {/* <SoftBox mt={3} textAlign="center">
      <SoftTypography variant="button" color="text" fontWeight="regular">
        Don&apos;t have an account?{" "}
        <SoftTypography
          component={Link}
          to="/authentication/sign-up/illustration"
          variant="button"
          color="info"
          fontWeight="medium"
          textGradient
        >
          Sign up
        </SoftTypography>
      </SoftTypography>
    </SoftBox> */}
      </SoftBox>
    </IllustrationLayout>
  );
}

export default Illustration;
