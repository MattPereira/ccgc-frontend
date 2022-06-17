import React from "react";
import "./DataRow.css";

/**DataRow component
 *
 * displays all the strokes or putts for a given round
 *
 *
 * rowHeader is the <th> for the row
 * holeValues is an object with the values for each hole
 * calculations is an object with calculated values for the row
 *
 *
 */

const DataRow = ({ rowHeader, holeValues, calculations, rowColor }) => {
  return (
    <tr className={rowColor}>
      <th>{rowHeader}</th>
      {Object.values(holeValues).map((val, idx) => (
        <td key={idx}>{val}</td>
      ))}
      {calculations
        ? Object.values(calculations).map((val, idx) => (
            <td key={idx}>{val}</td>
          ))
        : null}
    </tr>
  );
};

export default DataRow;
