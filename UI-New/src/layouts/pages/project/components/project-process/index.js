// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import { Chip, Icon, IconButton, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Nodata from "components/Nodata";
import DataTable from "examples/Tables/DataTable";
import { useToasts } from "react-toast-notifications";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Producttype from "./components/producttype";
import Addproduct from "./components/addproduct";
import Update from "./components/addproduct/update/Update";
import SoftAlertCloseIcon from "components/SoftAlert/SoftAlertCloseIcon";
import CloseIcon from "@mui/icons-material/Close";

function Projectprocess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedInitialStepData, setSelectedInitialStepData] = useState(null);
  const [hide, sethide] = useState(false);
  const [productTypeOptions, setproductTypeOptions] = useState([]);
  const [gstSlabsOptions, setGstSlabsOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const { addToast } = useToasts();

  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [stepsDocuments, setStepDocuments] = useState([]);

  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
      },
      {
        Header: "Code",
        accessor: "itemCode",
      },

      {
        Header: "Quantity",
        accessor: "quantity",
        align: "center",
      },
      {
        Header: "unit",
        accessor: "unit",
      },
      {
        Header: "Unit Rate",
        accessor: "unitRate",
        align: "center",
      },
      {
        Header: "Basic Value",
        accessor: "basicValue",
        align: "center",
      },
      {
        Header: "escl",
        accessor: "escl",
        align: "center",
      },
      {
        Header: "Gst Slab",
        accessor: "gstSlab",
      },
      {
        Header: "Amount",
        accessor: "amount",
        align: "center",
      },
      {
        Header: "With GST",
        accessor: "withGstDisplay",
        align: "center",
      },

      {
        Header: "Bidding Unit",
        accessor: "biddingUnit",
        align: "center",
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
  const manualEntries = [];

  useEffect(() => {
    const fetchProductTypeAvailable = async () => {
      try {
        const result = await axiosInstance.get(`/_v1/project/productType/getDetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const apiEntries = result.data.map((item) => ({
          value: item.id,
          label: (
            <div className="flex">
              <p className="my-auto">
                {item.code} ({item.productTypeName})
              </p>
            </div>
          ),
        }));
        setproductTypeOptions([...manualEntries, ...apiEntries]);
        console.log(productTypeOptions);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGstSlabsAvailable = async () => {
      try {
        const result = await axiosInstance.get(`/_v1/project/gstSlabs/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const apiEntries = result.data.map((item) => ({
          value: item.id,
          label: (
            <div className="flex">
              <p className="my-auto">{item.totalPercentage}%</p>
            </div>
          ),
        }));

        setGstSlabsOptions([...manualEntries, ...apiEntries]);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUnitAvailable = async () => {
      try {
        const result = await axiosInstance.get(`/_v1/project/unit/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const apiEntries = result.data.map((item) => ({
          value: item.id,
          label: (
            <div className="flex">
              <p className="my-auto">{item.unitName}</p>
            </div>
          ),
        }));
        setUnitOptions([...manualEntries, ...apiEntries]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGstSlabsAvailable();
    fetchProductTypeAvailable();
    fetchUnitAvailable();
  }, []);

  const esclTypeOptions = [
    { value: "NONE", label: "NONE" },
    { value: "ABOVE", label: "ABOVE" },
    { value: "BELOW", label: "BELOW" },
  ];

  const withGstOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/project/product/getDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      const transformedData = transformData(result.data);
      setTransformedRows(transformedData);

      const documents = await axiosInstance.get(`/_v1/project/allDocuments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const distinctSteps = [...new Set(documents.data.map((step) => step.stepname))];
      console.log(distinctSteps.map((stepName, index) => ({ stepname: stepName, index })));

      setSteps(distinctSteps.map((stepName, index) => ({ stepname: stepName, index })));

      const stepsDocumentMap = distinctSteps.reduce((map, stepName) => {
        const stepDocuments = documents.data.filter((doc) => doc.stepname === stepName);
        map[stepName] = stepDocuments;
        return map;
      }, {});

      console.log(stepsDocumentMap);
      setStepDocuments(stepsDocumentMap);
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (data) => {
    const rows = data.map((item, index) => ({
      id: item.id,
      "#": index + 1,
      productType: item.productTypeId,
      itemCode: item.itemCode,
      quantity: item.itemQuantity,
      unit: item.unitId,
      unitRate: item.unitRate,
      basicValue: item.basicValue,
      esclType: item.esclType,
      esclPercentage: item.esclPercentage,
      escl: (
        <div
          style={{
            fontSize: "15px",
            color: item.esclType == "ABOVE" ? "green" : item.esclType == "BELOW" ? "red" : "orange",
          }}
        >
          {item.esclPercentage}%
        </div>
      ),
      gstSlab: item.gstSlabsId,
      amount: item.amount,
      withGstDisplay: (
        <div style={{ fontSize: "22px", color: item.withGst ? "green" : "red" }}>
          <Icon style={{ marginTop: "10px" }}>
            {" "}
            {item.withGst ? "check_circle_sharp" : "cancel_sharp"}{" "}
          </Icon>
        </div>
      ),
      withGst: item.withGst,
      biddingUnit: item.biddingUnit,
      Action: (
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
      ),
    }));

    return rows;
  };

  const showProductType = () => {
    console.log("hiiiii");
    navigate(`/Projects/${id}/producttype`);
  };
  //   const showAddProduct=()=>{
  //     navigate(`/Projects/${id}/addproduct`);
  //   }
  //   const showProduct = () => {
  //     if (show) {
  //         navigate(`/Projects/${id}`);

  //     } else {
  //       setshow(!show)
  //       navigate(`/Projects/${id}/addProduct`, { replace: true });
  //     }
  //   };
  const viewDocument = () => {
    navigate(`/Projects/${id}`);
  };
  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    sethide(true);
  };

  useEffect(() => {
    const selectedInitialStep = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedInitialStepData(selectedInitialStep);
  }, [transformedRows, selectedItemId]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

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
              <Addproduct
                withGstOptions={withGstOptions}
                esclTypeOptions={esclTypeOptions}
                unitOptions={unitOptions}
                gstSlabsOptions={gstSlabsOptions}
                productTypeOptions={productTypeOptions}
                setShow={setshow}
                fetchData={fetchData}
              />
            </>
          ) : (
            <>
              <div className="flex justify-end gap-2 mb-3">
                <SoftButton color="info" onClick={() => showProductType()}>
                  Product Type
                </SoftButton>
                <SoftButton color="info" onClick={handleDialogOpen}>
                  View Document
                </SoftButton>
                <SoftButton color="info" onClick={() => setshow(!show)}>
                  Add Product
                </SoftButton>
              </div>
              {transformedRows.length === 0 ? (
                <Nodata />
              ) : (
                <>
                  {hide ? (
                    <Update
                      withGstOptions={withGstOptions}
                      esclTypeOptions={esclTypeOptions}
                      unitOptions={unitOptions}
                      gstSlabsOptions={gstSlabsOptions}
                      productTypeOptions={productTypeOptions}
                      fetchData={fetchData}
                      selectedItemData={selectedInitialStepData}
                      itemId={selectedItemId}
                      sethide={sethide}
                    />
                  ) : (
                    // <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                    <DataTable
                      entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                      canSearch={true}
                      showTotalEntries={true}
                      table={tableData}
                      pagination={{ variant: "gradient", color: "info" }}
                      isSorted={true}
                      noEndBorder={false}
                    />
                    // </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </SoftBox>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        {/* <DialogTitle
          style={{ fontSize: "25px", marginTop: "10px", marginLeft: "10px", marginBottom: "0" }}
        >
          View Document
        </DialogTitle> */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleDialogClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 20,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              "& .MuiStepConnector-lineVertical": {
                borderLeftStyle: "solid",
                borderWidth: "0px !important",
                minHeight: "5px",
              },
              "& .MuiStepLabel-label": {
                fontSize: "25px", // Adjust the font size of step labels as needed
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>{step.stepname}</div>
                </StepLabel>
                <StepContent>
                  {stepsDocuments[step.stepname]?.map((document, docIndex) => (
                    <div key={docIndex}>
                      <a href={document.documenturl} target="_blank" rel="noopener noreferrer">
                        <div style={{ fontSize: "18px" }}>
                          <span style={{ fontSize: "18px", marginRight: "5px" }}>•</span>
                          {document.documentname}
                        </div>
                      </a>
                    </div>
                  ))}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          {activeStep !== 0 && (
            <Button style={{ fontSize: "20px" }} onClick={handleBackStep} color="primary">
              Back
            </Button>
          )}

          {activeStep !== steps.length - 1 && (
            <Button style={{ fontSize: "20px" }} onClick={handleNextStep} color="primary">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Projectprocess;
