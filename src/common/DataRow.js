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
  //THIS DOES NOT WORK THE FOR LOOP DOES NOT RUN?!?
  // const parsArr = Object.values(parValues);
  // const strokesArr = Object.values(holeValues);

  // for (let i = 0; i < parsArr; i++) {
  //   console.log(parsArr[i]);
  //   if (strokesArr[i] > parsArr[i]) {
  //     strokesArr[i] = "birdie";
  //   }
  // }

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
