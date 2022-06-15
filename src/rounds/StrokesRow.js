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

const StrokesRow = ({
  username,
  strokes,
  totalStrokes,
  courseHandicap,
  netStrokes,
}) => {
  const playerName = username.split("-")[0];
  return (
    <tr>
      <th>{playerName}</th>
      {Object.values(strokes).map((s, idx) => (
        <td key={idx}>{s}</td>
      ))}
      <td>{totalStrokes}</td>
      <td>{courseHandicap}</td>
      <td>{netStrokes}</td>
    </tr>
  );
};

export default StrokesRow;
