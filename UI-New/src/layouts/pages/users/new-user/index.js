import { useState , useEffect} from "react";
// formik components
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
import UpdateForm from "layouts/pages/roles/components/Update/UpdateForm";
import Nodata from "components/Nodata";
import Forms from "./components/Form";
function NewUser() {
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedTenderData, setSelectedTenderData] = useState(null);
  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
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
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Role",
        accessor: "Role",
      },
      //   {
      //     Header: "Status",
      //     accessor: "Status",
      //   },
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
      const result = await axiosInstance.get("/_v1/role/getAll", {
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
      "User Name":item.userName,
      "Email":item.email,
      "Name": item.firstName+" "+item.middleName+" "+item.lastname,
      "Role":item.role,
      firstName:item.firstName,
      middleName:item.middleName,
      lastname:item.lastname,
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