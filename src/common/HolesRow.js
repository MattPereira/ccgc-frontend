import React from "react";

/**
 *
 * Component for displaying hole numbers 1-18
 *
 * if exteded is true, then display TOT, HCP, and NET
 *
 *
 */

const HolesRow = ({ extended }) => {
  return (
    <tr className="table-dark">
      <th>HOLE</th>
      {Array.from({ length: 18 }, (_, i) => (
        <th key={i + 1}>{i + 1}</th>
      ))}
      <th>TOT</th>
      {extended ? (
        <>
          <th>HCP</th>
          <th>NET</th>
        </>
      ) : null}
    </tr>
  );
};

export default HolesRow;
