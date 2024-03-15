/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard PRO React example components
import axiosInstance from "config/https";
import ProductPageHeadCell from "./ProductPageHeadCell";
import ProductPageBodyCell from "./ProductPageBodyCell";
import Todo from "layouts/pages/projects/general/components/Todo";
import { Card, Divider } from "@mui/material";

function ProductPageTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);
  const token = localStorage.getItem("token");

  const fetchData = async (pageNumber, pageSize, search) => {
    try {
      const result = await axiosInstance.post(
        "/_v1/user/page",
        {
          page: pageNumber,
          size: pageSize,
          sortBy: "username",
          orderBy: true,
          searchBy: search,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // Set the entries per page value based on the select value
  const setEntriesPerPage = async ({ value }) => {
    try {
      const newData = await fetchData(pageIndex, value, globalFilter);

      tableInstance.setPageSize(value);
      tableInstance.setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToPage = async (pageNumber) => {
    try {
      // Fetch data based on the new page number
      const newData = await fetchData(pageNumber, pageSize, globalFilter);

      // Update the table data with the new data
      tableInstance.gotoPage(pageNumber);
      tableInstance.setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <SoftPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </SoftPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const searchTable = async (value) => {
    try {
      // Fetch data based on the search term
      const newData = await fetchData(pageIndex, pageSize, value);

      // Update the table data with the new data
      tableInstance.setGlobalFilter(value);
      tableInstance.setAllFilters([]); // Clear any other filters
      tableInstance.setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <SoftBox display="flex" alignItems="center">
              <div className="w-20">
                <SoftSelect
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={setEntriesPerPage}
                  size="Small"
                />
              </div>
              <SoftTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </SoftTypography>
            </SoftBox>
          )}
          {canSearch && (
            <SoftBox width="12rem" ml="auto">
              <SoftInput
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  // onSearchChange(currentTarget.value);
                  searchTable(currentTarget.value);
                }}
              />
            </SoftBox>
          )}
        </SoftBox>
      ) : null}
      <Table {...getTableProps()}>
        {/* <SoftBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => (
                <ProductPageHeadCell
                  key={key}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </ProductPageHeadCell>
              ))}
            </TableRow>
          ))}
        </SoftBox> */}
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            // return (
            //   <TableRow key={key} {...row.getRowProps()}>
            //     {row.cells.map((cell, key) => (
            //       <ProductPageBodyCell
            //         key={key}
            //         noBorder={noEndBorder && rows.length - 1 === key}
            //         align={cell.column.align ? cell.column.align : "left"}
            //         {...cell.getCellProps()}
            //       >
            //         {cell.render("Cell")}
            //       </ProductPageBodyCell>
            //     ))}
            //   </TableRow>
            // );
            return (
              <div
                key={key}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "10px",
                }}
              >
                <Card>
                  <SoftBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    px={2}
                  >
              
                  </SoftBox>
                  <Divider />
                  <SoftBox pb={2} px={2}>
                    <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <Todo
                        title={row.cells[1].render("Cell")}
                        date="24 March 2019"
                        project={row.cells[1].render("Cell")}
                        company={row.cells[9].render("Cell")}
                        defaultChecked
                      />
                    </SoftBox>
                  </SoftBox>
                </Card>
              </div>
            );
          })}
        </TableBody>
      </Table>

      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => goToPage(pageIndex - 1)}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
            {renderPagination.length > 6 ? (
              <SoftBox width="5rem" mx={1}>
                <SoftInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(e) => goToPage(Number(e.target.value - 1))}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => goToPage(pageIndex + 1)}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
ProductPageTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
ProductPageTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default ProductPageTable;
