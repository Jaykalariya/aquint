// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import { Chip, Icon } from "@mui/material";
import Nodata from "components/Nodata";
import DataTable from "examples/Tables/DataTable";
import { useToasts } from "react-toast-notifications";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Form from "./components/Form";
import Update from "./components/update/Update";
function Producttype() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const token = localStorage.getItem("token");
  const [transformedRows, setTransformedRows] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hide, sethide] = useState(false);
  const [selectedProductTypeData, setselectedProductTypeData] = useState(null);
  const { addToast } = useToasts();

  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "#",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Name",
        accessor: "name",
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
    {
      value: 1,
      label: (
        <div className="flex">
          <p className="my-auto">First Step (1)</p>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/project/productType/getDetails/${id}`, {
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
      code: item.code,
      name: item.productTypeName,
      Action: (
        <Icon onClick={() => handleEdit(item.id)} style={{ cursor: "pointer" }}>
          edit
        </Icon>
      ),
    }));
    return rows;
  };

  const showProduct = () => {
    navigate(`/Projects/${id}`);
  };

  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    sethide(true);
  };

  useEffect(() => {
    const selectedProductType = transformedRows.find((item) => item.id === selectedItemId);
    setselectedProductTypeData(selectedProductType);
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
              <Form setShow={setshow} fetchData={fetchData} />
            </>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <div className="flex justify-start">
                  <SoftButton color="info" onClick={() => showProduct()}>
                    Back
                  </SoftButton>
                </div>
                <div className="flex justify-end gap-2">
                  <SoftButton color="info" onClick={() => setshow(!show)}>
                    +Add
                  </SoftButton>
                </div>
              </div>

              {transformedRows.length === 0 ? (
                <Nodata />
              ) : (
                <>
                  {hide ? (
                    <Update
                      selectedItemData={selectedProductTypeData}
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

export default Producttype;
