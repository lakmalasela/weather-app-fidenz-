import React from "react";

export const SortableHeader = ({ columnKey, label, sortConfig, onSort }) => {
  const handleClick = () => {
    onSort(columnKey);
  };

  const getSortIcon = () => {
    if (sortConfig.key !== columnKey) {
      return <i className="ri-arrow-up-down-line"></i>;
    }
    return sortConfig.direction === "ascending" 
      ? <i className="ri-arrow-up-s-line"></i>
      : <i className="ri-arrow-down-s-line"></i>;
  };

  return (
    <th style={{ cursor: "pointer" }} onClick={handleClick}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span className="ms-2">{getSortIcon()}</span>
      </div>
    </th>
  );
};