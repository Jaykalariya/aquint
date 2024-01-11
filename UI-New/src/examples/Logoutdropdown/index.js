/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

const LogoutDropdown = ({ user ,setUser}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("Token");
    setUser(null);
    handleClose(); 
  };

  return (
    <>
      <Button onClick={handleClick}>
        <IconButton sx={navbarIconButton} size="small">
          <div>
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="person" className="h-5 w-5 rounded-full" />
            ) : (
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-gray-400 text-white">
                {`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}
              </div>
            )}
          </div>
          <SoftTypography variant="button" fontWeight="medium">
            {`${user.firstname} ${user.lastname}`}
          </SoftTypography>
        </IconButton>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default LogoutDropdown;
