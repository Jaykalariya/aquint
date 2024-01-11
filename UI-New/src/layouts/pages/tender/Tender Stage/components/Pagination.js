/* eslint-disable react/prop-types */
import { Icon } from "@mui/material";
import SoftPagination from "components/SoftPagination";
import axiosInstance from "config/https";
import React, { useState, useEffect, useMemo } from "react";

const Pagination = ({ search, setcurrentRows, transformedRows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const token = localStorage.getItem("token");

  const filteredRows = useMemo(() => {
    return transformedRows.filter((row) =>
      row["Tender StageName"].toLowerCase().includes(search.toLowerCase())
    );
  }, [search, transformedRows]);

  useEffect(() => {
    updateCurrentRows();
  }, [currentPage, search, filteredRows]);

  const updateCurrentRows = () => {
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentRows = filteredRows.slice(firstIndex, lastIndex);
    setcurrentRows(currentRows);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    axiosInstance.post(
      "/_v1/tender/stage/getTenderStageByPage",
      {
        page: pageNumber,
        size: postsPerPage,
        // "sortBy": "string",
        // "orderBy": true,
        // "searchBy": "string"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
  };

  const paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRows.length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="flex justify-center content-center mt-2">
      <SoftPagination>
        <SoftPagination
          item
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon>keyboard_arrow_left</Icon>
        </SoftPagination>
        {paginationNumbers.map((number) => (
          <SoftPagination
            key={number}
            item
            active={number === currentPage}
            onClick={() => handlePagination(number)}
          >
            {number}
          </SoftPagination>
        ))}
        <SoftPagination
          item
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === paginationNumbers.length}
        >
          <Icon>keyboard_arrow_right</Icon>
        </SoftPagination>
      </SoftPagination>
    </div>
  );
};

export default Pagination;
