import { useState } from "react";
import Sidenav from "./Componets/Sidenav";
import Timeline from "./Componets/Timeline";
import Notes from "./Componets/Notes";
import Tenderinfo from "./Componets/Tenderinfo";
import File from "./Componets/Files/Index";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import SoftBox from "components/SoftBox";
import { Grid } from "@mui/material";

/* eslint-disable react/prop-types */
function Tenderprofile({ tenderid }) {
  console.log(tenderid);

  return (
    <SoftBox >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav />
        </Grid>
        <Grid item xs={12} lg={9}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Header /> */}
              </Grid>
              <Grid item xs={12}>
              <Tenderinfo tenderid={tenderid} />
              </Grid>
              <Grid item xs={12}>
              <Timeline tenderid={tenderid} />
              </Grid>
              <Grid item xs={12}>
              <Notes tenderid={tenderid} />
              </Grid>
              <Grid item xs={12}>
              <File tenderid={tenderid} />
              </Grid>
            </Grid>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Tenderprofile;
