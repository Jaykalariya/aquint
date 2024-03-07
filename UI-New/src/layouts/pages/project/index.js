import { Grid, Menu, MenuItem } from "@mui/material";
import Nodata from "components/Nodata";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function Project() {
    const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
  const [designToolsMenu, setDesignToolsMenu] = useState(null);
  const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
  const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={5} pb={2}>
        <Grid item xs={12} md={8}>
          <SoftBox mb={1}>
            <SoftTypography variant="h5">Ongoing Projects</SoftTypography>
          </SoftBox>
        </Grid>
        <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
              <ComplexProjectCard
                // image={logoSlack}
                id={2}
                stepOrder={1}
                stepId={2}
                title="slack bot"
                description="If everything I did failed - which it doesn't, I think that it actually succeeds."
                dateTime="02.03.22"
                members={[team1, team2, team3, team4, team5]}
                dropdown={{
                  action: openSlackBotMenu,
                  menu: renderMenu(slackBotMenu, closeSlackBotMenu),
                }}
              />
            </Grid>
           
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Project;
