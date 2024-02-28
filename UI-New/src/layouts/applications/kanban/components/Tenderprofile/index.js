import { useState } from "react";
import Sidenav from "./Componets/Sidenav";
import Timeline from "./Componets/Timeline";
import Notes from "./Componets/Notes";
import Tenderinfo from "./Componets/Tenderinfo";
import File from "./Componets/Files/Index";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import SoftBox from "components/SoftBox";
import { Grid } from "@mui/material";
import Header from "../Header";
import { useParams } from "react-router-dom";

function Tenderprofile() {
  const { id } = useParams();
  console.log(id);

  const [fileChangeFlag, setFileChangeFlag] = useState(false);
  const handleFileChange = () => {
    setFileChangeFlag(!fileChangeFlag);
  };

  return (
    <SoftBox ml={35} mt={5}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav />
        </Grid>
        <Grid item xs={12} lg={9}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Tenderinfo tenderid={id} />
              </Grid>
              <Grid item xs={12}>
                <Timeline tenderid={id} fileChangeFlag={fileChangeFlag}/>
              </Grid>
              <Grid item xs={12}>
                <Notes tenderid={id} />
              </Grid>
              <Grid item xs={12}>
                <File  tenderid={id} onFileChange={handleFileChange} />
              </Grid>
            </Grid>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );  
}

export default Tenderprofile;
