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

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard PRO React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { Box, Icon } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "config/https";
import SoftButton from "components/SoftButton";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const defaultId = JSON.parse(localStorage.getItem("userProfile")).id;
  const userId = id || defaultId;
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);


  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`_v1/user/allUserDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleEditClick = () => {
    // Trigger the click event of the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file.name);
  //   setSelectedImage(file);
    
  //   handleImageChange(user.id,)
  // };

  const handleImageChange= async (event) => {
    try {
    const file = event.target.files[0];

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

      console.log(file);
      console.log(formData);
  
      const result = await axiosInstance.post(`_v1/user/upload/profilePhoto`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      setUpdatedUser(result.data);
      setEditMode(false);
      setSelectedImage(null);
      handleImageUpload(result.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageUpload = async (updatedUser) => {
    try {
      const result = await axiosInstance.put(`_v1/user/changeProfileImage`,
      {
        "id": user.id,
        "imageUrl": updatedUser
    }
    , {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });

      console.log("Photo uploaded");
      fetchData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateButtonClick = () => {
    if (editMode) {
      // Upload the selected image
      handleImageUpload();
    } else {
      // Navigate to the update page
      navigate(`/pages/account/settings/${userId}`);
    }
  };
  const handleSave = () => {
    // Perform save operation or API call here

    setIsModified(false); // Reset the modified state after saving
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
        <SoftBox className="ml-5 pt-5" position="relative" height="max-content">
        <SoftBox alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1} style={{ zIndex: editMode ? 3 : 2  }}>
        {id==null? (
          <SoftBox
            alt="spotify logo"
            position="absolute"
            right={0}
            bottom={0}
            mr={-1}
            mb={-1}
            style={{ zIndex: editMode ? 3 : 2 }}
          >
            <SoftButton variant="gradient" color="light" size="small" iconOnly onClick={handleEditClick}>
              <Icon>edit</Icon>
            </SoftButton>
          </SoftBox>
        ) : null}
              </SoftBox>
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
        </SoftBox>
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
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  sx={{ background: "transparent", width: "50%" }}
                >
                  <Tab label="Update" icon={<Settings />} onClick={handleUpdateButtonClick} />
                </Tabs>
              </Box>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
      <input
        type="file"
        // accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </SoftBox>
  );
}

export default Header;
