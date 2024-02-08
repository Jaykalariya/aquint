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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import { useParams } from "react-router-dom";
import axiosInstance from "config/https";


function Header() {
  const [visible, setVisible] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const defaultId = JSON.parse(localStorage.getItem("userProfile")).id;
  const userId = id || defaultId;

  const handleSetVisible = () => setVisible(!visible);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card id="profile">
      <SoftBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
          <div>
              {user.imageUrl ? (
                <SoftAvatar
                  src={user.imageUrl}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-400 text-white text-xl shadow-md h-14 w-14 rounded-full">
                  {user &&
                    user.firstname &&
                    user.lastname &&
                    `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}
                </div>
              )}
            </div>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
              {`${user.firstname} ${user.lastname}`}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            {/* <SoftBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <SoftTypography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </SoftTypography>
              <SoftBox mx={1}>
                <Switch checked={visible} onChange={handleSetVisible} />
              </SoftBox>
            </SoftBox> */}
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Header;
