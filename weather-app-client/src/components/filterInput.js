import React from "react";

export const FilterInput = ({ filterText, onFilterChange }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="Filter by city..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="form-control"
      />
    </div>
  );
};