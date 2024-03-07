// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import { Chip, Icon } from "@mui/material";
import Forms from "./components/Form";
import Nodata from "components/Nodata";
import DataTable from "examples/Tables/DataTable";
import UpdateForm from "./components/update/UpdateForm";
import Tenderstage from "layouts/pages/tender/Tender Stage";

function Gstslab() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState(null);

  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
      },
      {
        Header: "Total GST",
        accessor: "total",
      },

      {
        Header: "CGST",
        accessor: "cgst",
      },
      {
        Header: "SGST",
        accessor: "sgst",
      },
      {
        Header: "IGST",
        accessor: "igst",
      },
      {
        Header: "Action",
        accessor: "Action",
      },
    ],
    rows: transformedRows,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/_v1/project/gstSlabs/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
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
      total: item.totalPercentage +"%",
      cgst: item.cgstPercentage +"%",
      sgst: item.sgstPercentage +"%",
      igst: item.igstPercentage +"%",
      totalPercentage: item.totalPercentage,
      cgstPercentage: item.cgstPercentage,
      sgstPercentage: item.sgstPercentage,
      igstPercentage: item.igstPercentage,
      Action: (
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
      ),
    }));

    return rows;
  };

  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    sethide(true);
  };

  useEffect(() => {
    const selectedProject = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedProjectData(selectedProject);
  }, [transformedRows, selectedItemId]);

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
              <Forms setShow={setshow} fetchData={fetchData} />
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
                    <UpdateForm
                      selectedItemData={selectedProjectData}
                      itemId={selectedItemId}
                      sethide={sethide}
                      fetchData={fetchData}
                    />
                  ) : (
                    <DataTable
                      entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                      canSearch={true}
                      showTotalEntries={true}
                      table={tableData}
                      pagination={{ variant: "gradient", color: "info" }}
                      isSorted={true}
                      noEndBorder={false}
                    />
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

export default Gstslab;