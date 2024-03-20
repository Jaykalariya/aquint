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
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React icons
import SpaceShip from "examples/Icons/SpaceShip";
import Document from "examples/Icons/Document";
import Cube from "examples/Icons/Cube";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Settings from "examples/Icons/Settings";
import CreditCard from "examples/Icons/CreditCard"; 
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
// import Achievement from '@mui/icons-material/Achievement';
import { Icon } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

function Sidenav() {
  const sidenavItems = [
    { icon: <InfoIcon fontSize="small" />, label: "Basic-Info", href: "profile" },
    { icon: <AccountBalanceIcon fontSize="small" />, label: "Bank-Info", href: "Bank-Info" },
    { icon: <FamilyRestroomIcon fontSize="small" />, label: "Family-info", href: "Family-info" },
    {
      icon: <LocalHospitalIcon fontSize="small" />,
      label: "Health-info",
      href: "Healthissue-info",
    },
    {
      icon: <SchoolIcon fontSize="small" />,
      label: "Qualification-info",
      href: "Qualification-info",
    },
    { icon: <WorkIcon fontSize="small" />, label: "Work-Experience", href: "Work-Experience" },
    { icon: <SpaceShip fontSize="small" />, label: "Training-Info", href: "Training-Info" },
    {
      icon: <Icon fontSize="small">emoji_events</Icon>,
      label: "Achievement-Info",
      href: "Achievement-Info",
    },
    {
      icon: <Icon fontSize="small">person</Icon>,
      label: "Employe-Info",
      href: "Employe-Info",
    },

    // { icon: <CreditCard />, label: "delete account", href: "delete-account" },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <SoftBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <SoftTypography
          component="a"
          href={`#${href}`}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <SoftBox mr={1.5} lineHeight={1}>
            {icon}
          </SoftBox>
          {label}
        </SoftTypography>
      </SoftBox>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <SoftBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </SoftBox>
    </Card>
  );
}

export default Sidenav;
