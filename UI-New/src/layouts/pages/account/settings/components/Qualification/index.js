import { Card, Typography, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import axiosInstance from "config/https";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "examples/Tables/Table";
import Addform from "./Componets/Addform";
import Updateform from "./Componets/Updateform";

const QualificationTable = () => {
  const token = localStorage.getItem("token");
  const [qualifications, setQualifications] = useState([]);
  const { id } = useParams();
  const userId = id;
  const columns = [
    { name: "Qualification Name", align: "left", width: "auto" },
    { name: "Board/University", align: "left", width: "auto" },
    { name: "Percentage", align: "left", width: "auto" },
    { name: "Year", align: "left", width: "auto" },
    { name: "Subject", align: "left", width: "auto" },
    { name: "Action", align: "center", width: "auto" },
  ];
  const [show, setshow] = useState(true);
  const [hide, sethide] = useState(true);
  const [Selecteddata, setSelecteddata] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/qualification/getDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQualifications(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleEdit(id) {
    console.log("id", id);
    const result = qualifications.filter((item) => item.id === id);
    if (result) {
      sethide(false);
      setSelecteddata(result[0]);
    }
    console.log("result");
  }

  return (
    <Card id="Qualification-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <Typography variant="h5">Qualification Info</Typography>
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
          <div className="px-5 m-5">
            {hide ? (
              <div className="h-96 overflow-y-auto">
                <Table
                  columns={columns}
                  rows={qualifications.map((qualification, index) => ({
                    "Qualification Name": qualification.qualificationName,
                    "Board/University": qualification.universityName,
                    Percentage: qualification.percentage,
                    Year: qualification.passingYear,
                    Subject: qualification.subject,
                    Action: (
                      <Icon
                        onClick={() => handleEdit(qualification.id)}
                        style={{ cursor: "pointer" }}
                      >
                        edit
                      </Icon>
                    ),
                  }))}
                />
              </div>
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
};

export default QualificationTable;
