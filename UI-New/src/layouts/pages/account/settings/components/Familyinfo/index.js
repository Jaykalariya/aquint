import { Card, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Updateform from "./Componets/Updateform";
import Addform from "./Componets/Addform";

function Familyinfo() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id || defaultId;

  const columns = [
    { name: "Family MemberName", align: "center", width: "auto" },
    { name: "Occupation", align: "left", width: "auto" },
    { name: "BirthDate", align: "left", width: "auto" },
    { name: "MobileNumber", align: "left", width: "auto" },
    { name: "Relation", align: "left", width: "auto" },
    { name: "Action", align: "center", width: "auto" },
  ];
  const [familyMemberDetails, setfamilyMemberDetails] = useState([]);
  const [show, setshow] = useState(true);
  const [hide, sethide] = useState(true);
  const [Selecteddata, setSelecteddata] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/familyMemberDetails/getDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setfamilyMemberDetails(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    const result = familyMemberDetails.filter((item) => item.id === id);
    sethide(false);
    if (result) {
      // setformdata({
      //   userId: userId,
      //   familyMemberName: result[0].familyMemberName,
      //   occupation: result[0].occupation,
      //   birthDate: new Date(result[0].birthDate),
      //   mobileNumber: result[0].mobileNumber,
      //   relation: result[0].relation,
      // });
      // console.log(new Date(result[0].birthDate));
      // console.log(result);
      setSelecteddata(result[0]);
    }
  };

  return (
    <Card id="Family-info" sx={{ overflow: "visible" }}>
      <SoftBox pt={3} pl={3}>
        <SoftTypography variant="h5">Family info</SoftTypography>
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
                  rows={familyMemberDetails.map((item) => ({
                    "Family MemberName": item.familyMemberName,
                    Occupation: item.occupation,
                    BirthDate: BirthdateFormatter(item.birthDate),
                    MobileNumber: item.mobileNumber,
                    Relation: item.relation,
                    Action: (
                      <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
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
}

export default Familyinfo;
