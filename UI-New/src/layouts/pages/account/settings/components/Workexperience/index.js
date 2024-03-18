import { Card, Icon, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import Updateform from "./componets/Updateform";
import Addform from "./componets/Addform";
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import { useParams } from "react-router-dom";

function Workexperience() {
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(true);
  const [hide, sethide] = useState(true);
  const [Workexperience, setWorkexperience] = useState([]);
  const [Selecteddata, setSelecteddata] = useState();
  const { id } = useParams();
  const userId = id;
  const columns = [
    { name: "Company Name", align: "center", width: "auto" },
    { name: "Designation", align: "left", width: "auto" },
    { name: "StartDate", align: "left", width: "auto" },
    { name: "EndDate", align: "left", width: "auto" },
    { name: "GrossSalary", align: "left", width: "auto" },
    { name: "Action", align: "center", width: "auto" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/workExperience/getDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkexperience(result.data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  function handleEdit(id) {
    const result = Workexperience.filter((item) => item.id === id);
    if (result) {
      sethide(false);
      setSelecteddata(result[0]);
      console.log(result);
    }
  }

  return (
    <Card id="Work-Experience" sx={{ overflow: "visible" }}>
      <SoftBox pt={3} pl={3}>
        <Typography variant="h5">Work Experience Info</Typography>
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
              <SoftBox component="form">
                <div className="h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    rows={Workexperience.map((Workexperience) => ({
                      "Company Name": Workexperience.companyName,
                      Designation: Workexperience.designation,
                      StartDate: BirthdateFormatter(Workexperience.startDate),
                      EndDate: BirthdateFormatter(Workexperience.endDate),
                      GrossSalary: Workexperience.grossSalary,
                      Action: (
                        <Icon
                          onClick={() => handleEdit(Workexperience.id)}
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

export default Workexperience;
