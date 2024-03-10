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
import { useToasts } from "react-toast-notifications";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function Initialsteps() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedInitialStepData, setSelectedInitialStepData] = useState(null);
  const [stepOrderOptions, setstepOrderOptions] = useState([]);
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
        Header: "Name",
        accessor: "stepName",
      },

      {
        Header: "Order NUmber",
        accessor: "stepOrderDisplay",
        align:"center"
      },
      {
        Header: "Compulsory",
        accessor: "isCompulsoryDisplay",
        align:"center"
      },
      {
        Header: "Able to Add Product",
        accessor: "isAbleToAddProductDisplay",
        align:"center"
      },
      {
        Header: "Status",
        accessor: "status",
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

  const manualEntries = [
    { value: 1, label: <div className="flex"><p className="my-auto">First Step (1)</p></div> },
  ];

  useEffect(() => {
      fetchStepOrderData();
    }, []);

    const fetchStepOrderData = async () => {
      try {
        const result = await axiosInstance.get("/_v1/project/projectInitialSteps/getAllActive", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const apiEntries = result.data
        .filter((item) => item.stepOrder > 0)
        .map((item) => ({
          value: item.stepOrder + 1,
          label: (
            <div className="flex">
              <p className="my-auto">After {item.stepName} ({item.stepOrder + 1})</p>
            </div>
          ),
        }));
      
        setstepOrderOptions([...manualEntries, ...apiEntries]);
        console.log(stepOrderOptions);
      } catch (error) {
        console.error(error);
      }
    };

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/_v1/project/projectInitialSteps/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      const transformedData = transformData(result.data);
      setTransformedRows(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (data) => {
    const rows = data.map((item, index) => ({
      id: item.id,
      "#": index + 1,
      stepName: item.stepName,
      stepOrderDisplay: (<div>
{      item.stepOrder==1 ?
      (item.stepOrder)
      :item.stepOrder!=-1 ?
      (item.stepOrder)
      :("")
    }
      </div>),
   isCompulsoryDisplay: (

      <div  style={{ fontSize:"22px", color: item.isCompulsory ? "green" : "red" }}>
        <Icon style={{marginTop:"10px"}}> {item.isCompulsory ? "check_circle_sharp" : "cancel_sharp"} </Icon>
      
    </div>
  ),

  isAbleToAddProductDisplay: (
     <div  style={{ fontSize:"22px", color: item.isAbleToAddProduct ? "green" : "red" }}>
        <Icon style={{marginTop:"10px"}}> {item.isAbleToAddProduct ? "check_circle_sharp" : "cancel_sharp"} </Icon>
    </div>
  ),

      stepOrder:item.stepOrder,
      isCompulsory: item.isCompulsory,
      isAbleToAddProduct: item.isAbleToAddProduct,
      status: (
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
        item.status==true ?
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon> :<div> </div>
      ),
    }));

    return rows;
  };

  const handleStatusChange = async (id, status) => {
    try {
      setStatusChangeDialogOpen(true);
      setStatusChangeConfirmationData({
        id,
        status,
      });
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
        "/_v1/project/projectInitialSteps/changeStatus",
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
      fetchData();
      fetchStepOrderData();
      setStatusChangeDialogOpen(false);
 
      console.log(statusChangeDialogOpen);
    } catch (error) {
      fetchData();
      fetchStepOrderData();
      setStatusChangeDialogOpen(false);
      toast.error("Error changing status");
      console.error("Error changing status:", error);
    }
  };

  const handleCloseStatusChangeDialog = () => {
    setStatusChangeDialogOpen(false);
  };

  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    sethide(true);
  };

  useEffect(() => {
    const selectedInitialStep = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedInitialStepData(selectedInitialStep);
  }, [transformedRows, selectedItemId]);

  return (
    <DashboardLayout>
            <Dialog open={statusChangeDialogOpen} onClose={handleCloseStatusChangeDialog}>
        <DialogTitle>Status Change Confirmation</DialogTitle>
        <DialogContent>
            <>
              <p style={{ color: "red", fontStyle: "italic" , marginBottom:'5px'}}>
                This action might effect Initial step status of Projects
              </p>
            </>
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
      <SoftBox className="mt-2 h-screen">
        <div className="mt-3">
          {show ? (
            <>
              <div className="flex justify-end mb-2">
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  Back
                </SoftButton>
              </div>
              <Forms 
                    options={stepOrderOptions} 
                    fetchStepOrderData={fetchStepOrderData}  
                    setShow={setshow} 
                    fetchData={fetchData} />
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
                    options={stepOrderOptions}
                    fetchStepOrderData={fetchStepOrderData}
                      selectedItemData={selectedInitialStepData}
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

export default Initialsteps;