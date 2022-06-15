import React from "react";

/**
 *
 * Component for displaying hole numbers, tot, hcp, and net.
 *
 *
 */

const HolesRow = ({ extended }) => {
  return (
    <tr className="table-dark">
      <th>HOLE</th>
      {Array.from({ length: 18 }, (_, i) => (
        <td key={i + 1}>{i + 1}</td>
      ))}
      <td>TOT</td>
      {extended ? (
        <>
          <td>HCP</td>
          <td>NET</td>
        </>
      ) : null}
    </tr>
  );
};

export default HolesRow;
