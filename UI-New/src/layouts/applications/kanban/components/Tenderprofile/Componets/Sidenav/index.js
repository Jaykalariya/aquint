/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Sidenav({ setActiveTab }) {
  const sidenavItems = [
    { label: "TenderInfo", href: "tender-info" },
    { label: "TimeLine", href: "timeline" },
    { label: "Notes", href: "notes" },
    { label: "File", href: "file" },
  ];

  const handleItemClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderSidenavItems = sidenavItems.map(({ label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <SoftBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <SoftTypography
          component="button"
          onClick={() => handleItemClick(href)}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          width = "13rem"
          m = "auto"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "block",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(32)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
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
      className="h-screen"
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
