import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Stageform from "./components/Stageform";
import SoftBox from "components/SoftBox";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Table from "examples/Tables/Table";
import axiosInstance from "config/https";
import { Chip, Icon } from "@mui/material";
import Pagination from "./components/Pagination";

function Tenderstage() {
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(false);
  const [transformedRows, setTransformedRows] = useState([]);
  const [currentRows, setcurrentRows] = useState();
  const [search, setsearch] = useState("");

  const columns = [
    { name: "#", align: "center", width: "30px" },
    { name: "Tender StageName", align: "center", width: "auto" },
    { name: "status", align: "center", width: "50px" },
    { name: "action", align: "center", width: "50px" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/_v1/tender/stage/getAllTenderStage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transformedData = transformData(result.data);
      setTransformedRows(transformedData);
    } catch (error) {
      //  throw error
      console.log(error);
    }
  };

  const transformData = (data) => {
    const rows = data.map((item, index) => ({
      "#": index + 1,
      "Tender StageName": item.tenderStageName,
      status: (
        <Chip
          label={item.status ? "Active" : "Inactive"}
          variant="outlined"
          style={{
            color: "white",
            backgroundColor: item.status ? "green" : "red",
          }}
          size="small"
        />
      ),
      action: (
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
      ),
    }));
    return rows;
  };

  const handleEdit = (itemId) => {
    console.log("Edit item with ID:", itemId);
  };

  function handelserach(event) {
    setsearch(event.target.value);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <div className="mt-3">
          {show ? (
            <>
              <div className="flex justify-end mb-2">
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  Back
                </SoftButton>
              </div>
              <Stageform setShow={setshow} fetchData={fetchData} />
            </>
          ) : (
            <>
              <div className="flex justify-end gap-2 mb-3">
                <SoftInput
                  onChange={handelserach}
                  placeholder="Type here..."
                  icon={{ component: "search", direction: "left" }}
                />
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  +Add
                </SoftButton>
              </div>
              <Table columns={columns} rows={currentRows} />
              <Pagination
                search={search}
                setcurrentRows={setcurrentRows}
                transformedRows={transformedRows}
              />
            </>
          )}
        </div>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tenderstage;
