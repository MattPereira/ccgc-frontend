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
 * idea: pass through parValues and handicapValues to calculate
 * birdies, skins, etc?
 *
 * might want to rename this to strokesRow for the fancy logic
 * and puts putts/pars in a different row component
 *
 * how to feed in the par values to this component is tricky
 * since we are mapping over the data.rounds :(
 *
 */

const DataRow = ({
  rowHeader,
  holeValues,
  calculations,
  rowColor,
  parValues,
}) => {
  return (
    <tr className={rowColor}>
      <th>{rowHeader}</th>
      {holeValues
        ? Object.values(holeValues).map((val, idx) => <td key={idx}>{val}</td>)
        : null}
      {calculations
        ? Object.values(calculations).map((val, idx) => (
            <td key={idx}>{val}</td>
          ))
        : null}
    </tr>
  );
};

export default DataRow;
