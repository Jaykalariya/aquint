/* eslint-disable react/prop-types */
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

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import { useState } from "react";
import { Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon, KeyboardArrowDown, ViewList} from "@mui/icons-material";

function Header({ sethide, hide, setshow }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function handelchangepipe() {
    sethide(true);
    setshow(true);
    setAnchorEl(null);
  }

  function handelchangelist() {
    sethide(true);
    setshow(false);
    setAnchorEl(null);
  }

  return (
    <div className="flex gap-2">
      <IconButton
        onClick={handleClick}
        style={{ backgroundColor: "white", border: "2px solid skyblue", borderRadius: "16px" }}
      >
        <MenuIcon />
        <KeyboardArrowDown />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handelchangepipe}>
          <ViewList fontSize="small" style={{ marginRight: "8px" }} />
          Pipeline View
        </MenuItem>
        <MenuItem onClick={handelchangelist}>
          <ViewList fontSize="small" style={{ marginRight: "8px" }} />
          List View
        </MenuItem>
      </Menu>
      <>
        {hide ? (
          <SoftButton color="info" onClick={() => sethide(false)}>
            +Add
          </SoftButton>
        ) : (
          <SoftButton color="info" onClick={() => sethide(true)}>
            Back
          </SoftButton>
        )}
      </>
    </div>
  );
}

export default Header;
