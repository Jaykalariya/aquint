/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// @mui icons

// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import { Chip, Icon } from "@mui/material";
import Forms from "./components/Form";
import Pagination from "./components/Pagination";

function Addtender() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [search, setsearch] = useState("");
  const [transformedRows, setTransformedRows] = useState([]);
  const [currentRows, setcurrentRows] = useState();

  const columns = [
    { name: "#", align: "center", width: "30px" },
    { name: "tender type", align: "center", width: "auto" },
    { name: "status", align: "center", width: "50px" },
    { name: "action", align: "center", width: "50px" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/_v1/tender/type/getAllTenderType", {
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
      "tender type": item.tenderTypeName,
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
      action: <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>edit</Icon>,
    }));

    return rows;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("test hello");
    }, 2000); 
    
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  function handelserach(event) {
    setsearch(event.target.value);
  }

  const handleEdit = (itemId) => {
    console.log("Edit item with ID:", itemId);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <SoftBox className="mt-2">
        <div className="mt-3">
          {show ? (
            <>
              <div className="flex justify-end mb-2">
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  Back
                </SoftButton>
              </div>
              <Forms setShow={setshow} fetchData={fetchData} />
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

export default Addtender;
