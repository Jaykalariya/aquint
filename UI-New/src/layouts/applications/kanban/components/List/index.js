import React, { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import BirthdateFormatter from "examples/BirthdateFormatter";
import axiosInstance from "config/https";

function List() {
  const [transformedRows, setTransformedRows] = useState([]);
  const token = localStorage.getItem("token");
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/_v1/tender/allTenderDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transformedData = transformData(result.data);
      console.log(result.data);
      setTransformedRows(transformedData);
    } catch (error) {
      //  throw error
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
    }));

    return rows;
  };

  return (
    <DataTable
      entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
      canSearch={true}
      showTotalEntries={true}
      table={tableData}
      pagination={{ variant: "gradient", color: "info" }}
      isSorted={true}
      noEndBorder={false}
    />
  );
}

export default List;
