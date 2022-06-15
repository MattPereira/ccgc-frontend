import React from "react";

/**
 *
 * Each round is a essentially just a row in a table
 *
 *
 * name, strokes for each hole, totalStrokes,
 *
 *
 *
 */

const PuttsRow = ({ username, putts, totalPutts }) => {
  const playerName = username.split("-")[0];
  return (
    <tr>
      <th>{playerName}</th>
      {Object.values(putts).map((p, idx) => (
        <td key={idx}>{p}</td>
      ))}
      <td>{totalPutts}</td>
    </tr>
  );
};

export default PuttsRow;
