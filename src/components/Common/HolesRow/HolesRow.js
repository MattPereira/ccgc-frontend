import React from "react";

/**
 * Component for displaying hole numbers 1-18
 *
 *
 *
 */

const HolesRow = () => {
  return (
    <tr className="table-dark">
      <th>HOLE</th>
      {Array.from({ length: 18 }, (_, i) => (
        <th key={i + 1}>{i + 1}</th>
      ))}
      <th>TOT</th>
    </tr>
  );
};

export default HolesRow;
