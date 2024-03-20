import Nodata from "components/Nodata";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import Addform from "./Components/AddForm";
import { Icon } from "@mui/material";
import axiosInstance from "config/https";
import Updateform from "./Components/Updateform";

function Vender() {
  const [show, setshow] = useState(false);
  const [hide, sethide] = useState(true);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selecteddata, setselecteddata] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/vendor/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
      const transformedData = transformData(result.data);
      setTransformedRows(transformedData);
    } catch (error) {
      //  throw error
      console.log(error);
    }
  };

  const transformData = (data) => {
    const rows = data.map((item, index) => ({
      id: item.id,
      "#": index + 1,
      "Company Name": item.companyName,
      "Display Name": item.displayName,
      "Primary Person Name": item.firstName,
      Action: (
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
      ),
    }));

    return rows;
  };

  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
      },
      {
        Header: "Company Name",
        accessor: "Company Name",
      },
      {
        Header: "Display Name",
        accessor: "Display Name",
      },
      {
        Header: "Primary Person Name",
        accessor: "Primary Person Name",
      },
      {
        Header: "Action",
        accessor: "Action",
      },
    ],
    rows: transformedRows,
  };

  async function handleEdit(id) {
    const result = await axiosInstance.get(`/_v1/vendor/getDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data", result.data);
    setselecteddata(result.data);
    sethide(false);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox className="mt-2 h-screen">
        <div className="mt-3">
          {show ? (
            <>
              <div className="flex justify-end mb-2">
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  Back
                </SoftButton>
              </div>
              <Addform fetchData={fetchData} setshow={setshow} />
            </>
          ) : (
            <>
              <div className="flex justify-end gap-2 mb-3">
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  +Add
                </SoftButton>
              </div>
              {transformedRows.length === 0 ? (
                <Nodata />
              ) : (
                <>
                  {hide ? (
                    <DataTable
                      entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                      canSearch={true}
                      showTotalEntries={true}
                      table={tableData}
                      pagination={{ variant: "gradient", color: "info" }}
                      isSorted={true}
                      noEndBorder={false}
                    />
                  ) : (
                    <Updateform selecteddata={selecteddata} fetchData={fetchData} sethide={sethide}/>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Vender;
