import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Stageform from "./components/Stageform";
import SoftBox from "components/SoftBox";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import axiosInstance from "config/https";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
} from "@mui/material";
import Nodata from "components/Nodata";
import DataTable from "examples/Tables/DataTable";
import UpdateForm from "./components/Update/UpdateForm";
import { useToasts } from "react-toast-notifications";
import { toast } from "react-toastify";

function Tenderstage() {
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(false);
  const [transformedRows, setTransformedRows] = useState([]);
  const [hide, sethide] = useState(false);
  const [selectedTenderData, setSelectedTenderData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStageValue, setStageValue] = useState(null);
  const [numberOfTenderList, setNumberOfTenderList] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusChangeConfirmationData, setStatusChangeConfirmationData] = useState({
    id: null,
    status: null,
  });
  const { addToast } = useToasts();

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
      id: item.id,
      "#": index + 1,
      "Tender StageName": item.tenderStageName,
      "Tender Stage Name": (
        <div>
          {item.stageValue === 1 ? (
            <>
              <Icon style={{ margin: "7px 5px 0px 5px", color: item.color }}>thumb_up</Icon>
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
      Stage: item.stageValue,
      Color: item.color,
      Status: (
        <Chip
          onClick={() => handleStatusChange(item.id, item.status)}
          label={item.status == true ? "Active" : "Inactive"}
          variant="outlined"
          style={{
            cursor: "pointer",
            color: item.status == true ? "green" : "red",
            border: `1px solid ${item.status == true ? "green" : "red"}`,
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

  const handleStatusChange = async (id, status) => {
    try {
      setStatusChangeDialogOpen(true);
      setStatusChangeConfirmationData({
        id,
        status,
      });
      const tenderListOfStage = await axiosInstance.get(`_v1/tender/stage/tenderDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNumberOfTenderList(tenderListOfStage.data.length);
    } catch (error) {
      toast.error("Error changing status");
      console.error("Error changing status:", error);
    }
  };

  const handleConfirmStatusChange = async () => {
    try {
      const { id, status } = statusChangeConfirmationData;
      const newStatus = status === true ? false : true;
      const response = await axiosInstance.post(
        "/_v1/tender/stage/changeTenderStageStatus",
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const toastAppearance = newStatus === true ? "success" : "error";

      addToast(response.data.message, {
        appearance: toastAppearance,
      });
      setStatusChangeDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Error changing status");
      console.error("Error changing status:", error);
    }
  };

  const handleCloseStatusChangeDialog = () => {
    // Close the confirmation dialog without making any changes
    setStatusChangeDialogOpen(false);
  };

  useEffect(() => {
    console.log(transformedRows);
    const selectedTender = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedTenderData(selectedTender);
  }, [transformedRows, selectedItemId]);

  return (
    <DashboardLayout>
      <Dialog open={statusChangeDialogOpen} onClose={handleCloseStatusChangeDialog}>
        <DialogTitle>Status Change Confirmation</DialogTitle>
        <DialogContent>
          {numberOfTenderList > 0 ? (
            <>
              <p style={{ color: "red", fontStyle: "italic" , marginBottom:'5px'}}>
                There are still some tenders present in this stage.
              </p>
              <p>
                Number of active tenders: <strong>{numberOfTenderList}</strong>{" "}
              </p>
            </>
          ) : null}{" "}
          <p >Are you sure you want to change the status?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusChangeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
