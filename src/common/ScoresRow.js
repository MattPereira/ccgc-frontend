import React from "react";
import "./ScoresRow.css";

/**ScoresRow component
 *
 * displays all the strokes or putts for a given round
 *
 *
 */

const ScoresRow = ({ rowHeader, holeScores, totalScores }) => {
  return (
    <tr>
      <th>{rowHeader}</th>
      {Object.values(holeScores).map((score, idx) => (
        <td key={idx}>{score}</td>
      ))}
      {Object.values(totalScores).map((val, idx) => (
        <td key={idx}>{val}</td>
      ))}
    </tr>
  );
};

export default ScoresRow;
