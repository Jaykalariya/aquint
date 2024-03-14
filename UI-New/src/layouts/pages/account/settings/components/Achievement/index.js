import { Card, Icon, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import Updateform from "./componets/Updateform";
import Addform from "./componets/Addform";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "config/https";

function Achievement() {
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(true);
  const [hide, sethide] = useState(true);
  const [Achievement, setAchievement] = useState([]);
  const [Selecteddata, setSelecteddata] = useState();
  const { id } = useParams();
  const userId = id;
  const columns = [
    { name: "AchievementName", align: "center", width: "auto" },
    { name: "Achievement Description", align: "left", width: "auto" },
    { name: "Action", align: "center", width: "auto" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/achievement/getDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAchievement(result.data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  function handleEdit(id) {
    const result = Achievement.filter((item) => item.id === id);
    if (result) {
      sethide(false);
      setSelecteddata(result[0]);
      console.log(result);
    }
  }

  return (
    <Card id="Training-Info" sx={{ overflow: "visible" }}>
      <SoftBox pt={3} pl={3}>
        <Typography variant="h5">Achievement Info</Typography>
      </SoftBox>
      <div className="flex justify-end mr-5">
        {hide ? (
          <SoftButton color="info" onClick={() => setshow(!show)}>
            {show ? "Add" : "Back"}
          </SoftButton>
        ) : (
          <SoftButton color="info" onClick={() => sethide(true)}>
            Back
          </SoftButton>
        )}
      </div>
      <>
        {show ? (
          <div style={{ overflowX: "auto" }}>
            {hide ? (
              <SoftBox component="form">
                <div className="px-5 m-5">
                  <Table
                    columns={columns}
                    rows={Achievement.map((Traininginfo) => ({
                      AchievementName: Traininginfo.achievementName,
                      "Achievement Description": Traininginfo.achievementDescription,
                      Action: (
                        <Icon
                          onClick={() => handleEdit(Traininginfo.id)}
                          style={{ cursor: "pointer" }}
                        >
                          edit
                        </Icon>
                      ),
                    }))}
                  />
                </div>
              </SoftBox>
            ) : (
              <Updateform Selecteddata={Selecteddata} fetchData={fetchData} sethide={sethide} />
            )}
          </div>
        ) : (
          <Addform fetchData={fetchData} setshow={setshow} />
        )}
      </>
    </Card>
  );
}

export default Achievement;
