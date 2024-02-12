/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Cube from "examples/Icons/Cube";
import InfoIcon from '@mui/icons-material/Info';
import TimelineIcon from "@mui/icons-material/Timeline";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NotesIcon from "@mui/icons-material/Notes";
import Document from "examples/Icons/Document";

function Sidenav({ setActiveTab }) {
  const sidenavItems = [
    { label: "TenderInfo", href: "tender-info", icon: <InfoIcon  fontSize="small" /> },
    { label: "TimeLine", href: "timeline", icon: <TimelineIcon  fontSize="small"/> },
    { label: "Notes", href: "notes", icon: <NotesIcon fontSize="small" /> },
    { label: "File", href: "file",icon: <InsertDriveFileIcon fontSize="small"/>},
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
