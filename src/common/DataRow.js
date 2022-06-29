import React from "react";
import "./DataRow.css";
import { Link } from "react-router-dom";

/**DataRow component
 *
 * displays all the strokes or putts for a given round
 * also currently being used for displaying pars row
 *
 * rowHeader is the <th> for the row
 * holeValues is an object with the values for each hole
 * i.e. {hole1: 3, hole2: 4, ... hole18: 5}
 *
 * calculations is an object with calculated values for the row
 * i.e. {totalStrokes: 85, courseHandicap: 12, netStrokes: 73}
 *
 *
 * If there is a roundId, then create link to the round details page
 * through the <th>RowHeader</th> using the path "/rounds/:roundId"
 *
 */

const DataRow = ({
  roundId,
  rowHeader,
  holeValues,
  calculations,
  rowColor,
  rank,
}) => {
  return (
    <tr className={rowColor}>
      {roundId ? (
        <>
          <th>
            <Link to={`/rounds/${roundId}`}>{rowHeader}</Link>
          </th>
        </>
      ) : (
        <th>{rowHeader}</th>
      )}

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
