import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// NewUser page components
import UserInfo from "layouts/pages/users/new-user/components/UserInfo";
import Address from "layouts/pages/users/new-user/components/Address";
import Socials from "layouts/pages/users/new-user/components/Socials";
import Profile from "layouts/pages/users/new-user/components/Profile";
// NewUser layout schemas for form and form feilds
import validations from "layouts/pages/users/new-user/schemas/validations";
import form from "layouts/pages/users/new-user/schemas/form";
import initialValues from "layouts/pages/users/new-user/schemas/initialValues";
import { Chip, Icon, Tooltip } from "@mui/material";
import DataTable from "examples/Tables/DataTable";

import Nodata from "components/Nodata";
import Forms from "./components/Form";
import axiosInstance from "config/https";
import UpdateForm from "./components/Update/UpdateForm";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SoftTypography from "components/SoftTypography";
import { toast } from "react-toastify";
import { useToasts } from "react-toast-notifications";
function NewUser() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedTenderData, setSelectedTenderData] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const tableData = {
    columns: [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "UserName",
        accessor: "UserName",
      },
      {
        Header: "Email",
        accessor: "Email",
      },

      {
        Header: "Role",
        accessor: "Role",
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
  }, [tableData.rows.length]);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.post(
        "/_v1/user/page",
        {
          page: 1,
          size: 100,
          sortBy: "username", // replace with the actual field you want to sort by
          orderBy: true,
          searchBy: "", // replace with the actual search term
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      const transformedData = transformData(result.data.content);
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
      UserName: item.username,
      Email: item.email,
      Name: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.firstname.charAt(0)}
              style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "20%",
                marginRight: "10px",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {item.firstname.charAt(0).toUpperCase()}
              {item.lastname.charAt(0).toUpperCase()}
            </div>
          )}
          {item.firstname} {item.middlename} {item.lastname}
        </div>
      ),
      Role: item.roles,
      FirstName: item.firstname,
      MiddleName: item.middlename,
      LastName: item.lastname,
      Image: item.imageUrl,
      Status: (
        <Chip
          onClick={() => handleStatusChange(item.id, item.status)}
          label={item.status == "Active" ? "Active" : "Inactive"}
          variant="outlined"
          style={{
            cursor: "pointer",
            color: item.status == "Active" ? "green" : "red",
            border: `1px solid ${item.status == "Active" ? "green" : "red"}`,
          }}
          size="small"
        />
      ),
      Action: (
        <div>
          {/* <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
        <Icon className ="ml-1"onClick={() => handleProfile(item.id)} style={{ cursor: "pointer" }}>
        <HelpOutlineIcon />
      </Icon> */}
          <SoftBox display="flex" alignItems="center">
            <SoftTypography
              variant="body1"
              onClick={() => handleProfile(item.id)}
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip title="Show User Profile" placement="top">
                <Icon>visibility</Icon>
              </Tooltip>
            </SoftTypography>
            {/* <SoftBox mx={2}>
              <SoftTypography
                variant="body1"
                onClick={() => handleEdit(item.id)}
                color="secondary"
                sx={{ cursor: "pointer", lineHeight: 0 }}
              >
                <Tooltip title="Edit" placement="top">
                  <Icon>edit</Icon>
                </Tooltip>
              </SoftTypography>
            </SoftBox> */}
          </SoftBox>
        </div>
      ),
      userProf: (
        <Icon onClick={() => handleProfile(item.id)} style={{ cursor: "pointer" }}>
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
  const handleProfile = (itemId) => {
    navigate(`/Home/profile/${itemId}`);
  };
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const response = await axiosInstance.post(
        "_v1/user/changeUserStatus",
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const toastAppearance = newStatus === "Active" ? "success" : "error";

      addToast(response.data.message, {
        appearance: toastAppearance,
      });
      fetchData(); // Refresh the data after status change
    } catch (error) {
      toast.error("Error changing status");
      console.error("Error changing status:", error);
    }
  };
  useEffect(() => {
    const selectedTender = transformedRows.find((item) => item.id === selectedItemId);
    setSelectedTenderData(selectedTender);
  }, [transformedRows, selectedItemId]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
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

export default NewUser;
