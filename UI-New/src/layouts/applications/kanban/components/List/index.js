import React, { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import BirthdateFormatter from "examples/BirthdateFormatter";
import axiosInstance from "config/https";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Icon, Tooltip } from "@mui/material";
import Tenderprofile from "../Tenderprofile";

function List() {
  const [transformedRows, setTransformedRows] = useState([]);
  const token = localStorage.getItem("token");
  const [show, setshow] = useState(true);
  const [tenderid, settenderid] = useState();
  const tableData = {
    columns: [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Project Name",
        accessor: "Project Name",
      },
      {
        Header: "Project Display Name",
        accessor: "Project Display Name",
      },
      {
        Header: "Tender Stage",
        accessor: "Tender Stage",
      },
      {
        Header: "Tender Type",
        accessor: "Tender Type",
      },
      {
        Header: "Project Value",
        accessor: "Project Value",
      },
      {
        Header: "Submission Date",
        accessor: "Submission Date",
      },
      {
        Header: "Location",
        accessor: "Location",
      },
      {
        Header: "Action",
        accessor: "Action",
      },
    ],
    rows: transformedRows,
  };

  const IndianCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
    return formattedValue;
  };

  const handleaction = (id) => {
    settenderid(id);
    setshow(!show);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.post(
        "/_v1/tender/page",
        {
          page: 1,
          size: 100,
          orderBy: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("abhi",result.data.content);
      const transformedData = transformData(result.data.content);
      console.log(result.data);
      setTransformedRows(transformedData);
    } catch (error) {
      throw error;
      console.log(error);
    }
  };

  const transformData = (data) => {
    const rows = data.map((item, index) => ({
      id: index + 1,
      "Project Name": item.projectName,
      "Project Display Name": item.projectDisplayName,
      "Tender Stage": item.tenderStage,
      "Tender Type": item.tenderType,
      "Project Value": IndianCurrency(item.projectValue),
      "Submission Date": item.submissionDate,
      Location: item.location,
      Action: (
        <div>
          <SoftBox display="flex" alignItems="center">
            <SoftTypography
              variant="body1"
              onClick={() => handleaction(item.id)}
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip title="Show Tender Details" placement="top">
                <Icon>visibility</Icon>
              </Tooltip>
            </SoftTypography>
          </SoftBox>
        </div>
      ),
    }));

    return rows;
  };

  return (
    <>
      {show ? (
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
        <Tenderprofile tenderid={tenderid} />
      )}
    </>
  );
}

export default List;
