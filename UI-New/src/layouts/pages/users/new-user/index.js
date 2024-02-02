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
import { Icon } from "@mui/material";
import DataTable from "examples/Tables/DataTable";

import Nodata from "components/Nodata";
import Forms from "./components/Form";
import axiosInstance from "config/https";
import UpdateForm from "./components/Update/UpdateForm";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
function NewUser() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedTenderData, setSelectedTenderData] = useState(null);
  const navigate = useNavigate();
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
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("_v1/user/allUserDetails", {
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
      "UserName":item.username,
      "Email":item.email,
      "Name":(
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
                color:"black",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
              }}
            >
              {item.firstname.charAt(0)}{item.lastname.charAt(0)}
            </div>
          )}
          {item.firstname} {item.middlename} {item.lastname}
        </div>
      ),
      "Role":item.roles,
      "FirstName":item.firstname,
      "MiddleName":item.middlename,
      "LastName":item.lastname,
      "Image":item.imageUrl,
      //   Status: (
      //     <Chip
      //       label={item.status ? "Active" : "Inactive"}
      //       variant="outlined"
      //       style={{
      //         color: item.status ? "green" : "red",
      //         border: `1px solid ${item.status ? "green" : "red"}`,
      //       }}
      //       size="small"
      //     />
      //   ),
      Action: (<div>
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
        <Icon className ="ml-1"onClick={() => handleProfile(item.id)} style={{ cursor: "pointer" }}>
        <HelpOutlineIcon />
      </Icon>
      </div>
        
      ),
      userProf:(
        <Icon onClick={() => handleProfile(item.id)} style={{ cursor: "pointer" }}>
        edit
      </Icon>
      )
    }));
    return rows;
  };
  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    sethide(true);
  };
  const handleProfile = (itemId) => {
    navigate(`/Home/userprofile/${itemId}`);
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
                      entriesPerPage={{ defaultValue : 10, entries: [5, 10, 15, 20, 25] }}
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