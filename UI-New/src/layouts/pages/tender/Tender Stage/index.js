import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Stageform from "./components/Stageform";
import SoftBox from "components/SoftBox";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import axiosInstance from "config/https";
import { Chip, Icon } from "@mui/material";
import Nodata from "components/Nodata";
import DataTable from "examples/Tables/DataTable";
import UpdateForm from "./components/Update/UpdateForm";

function Tenderstage() {
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(false);
  const [transformedRows, setTransformedRows] = useState([]);
  const [hide, sethide] = useState(false);
  const [selectedTenderData, setSelectedTenderData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStageValue, setStageValue] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
      },
      {
        Header: "Tender StageName",
        accessor: "Tender Stage Name",
      },
      {
        Header: "Status",
        accessor: "Status",
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
      id : item.id,
      "#": index + 1,
      "Tender StageName":item.tenderStageName,
      "Tender Stage Name": (
        <div>
          {item.stageValue === 1 ? (
            <>
             <Icon style={{margin: "7px 5px 0px 5px", color: item.color }}>thumb_up</Icon>
            </>
          ) : item.stageValue === 2 ? (
            <>
              <Icon style={{ margin: "7px 5px 0px 5px", color: item.color }}>thumb_down</Icon>
            </>
          ) : (
            <>
              <Icon style={{ margin: "7px 5px 0px 5px", color: item.color }}>directions_run</Icon>
            </>
          )}
          {item.tenderStageName}
        </div>
      ),
      "Stage": item.stageValue,
      "Color": item.color,
      Status: (
        <Chip
          label={item.status ? "Active" : "Inactive"}
          variant="outlined"
          style={{
            color: item.status ? "green" : "red",
            border: `1px solid ${item.status ? "green" : "red"}`,
          }}
          size="small"
        />
      ),
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
    console.log(transformedRows);
    const selectedTender = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedTenderData(selectedTender);
  }, [transformedRows, selectedItemId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <div className="mt-3 h-screen">
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
                      selectedItemData={selectedTenderData}
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

export default Tenderstage;
