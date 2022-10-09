import React from "react";
import HolesRow from "../Common/HolesRow/HolesRow";
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

/** Member round table component
 *
 *
 * Table that displays the holes numbers, strokes, putts, and pars
 * for each member round
 *
 * Used by both MemberDetails and RoundDetails components
 *
 * Routes -> MemberDetails -> RoundTable
 * Routes -> RoundDetails -> RoundTable
 *
 */

const RoundTable = ({
  roundId,
  courseName,
  tournamentDate,
  strokes,
  putts,
  totalStrokes,
  totalPutts,
  pars,
}) => {
  const formattedData = [];

  strokes = Object.values(strokes);
  putts = Object.values(putts);
  pars = Object.values(pars);
  console.log(strokes);

  for (let i = 0; i < 18; i++) {
    formattedData.push({
      holeNumber: i + 1,
      strokes: strokes[i],
      putts: putts[i],
      par: pars[i],
    });
  }

  const parsRow = (
    <tr className="table-secondary">
      <th>PAR</th>
      {Object.values(pars).map((p) => (
        <th key={uuidv4()}>{p}</th>
      ))}
    </tr>
  );

  const strokesRow = (
    <tr className="bg-white">
      <th>STROKES</th>
      {Object.values(strokes).map((s) => (
        <td key={uuidv4()}>{s}</td>
      ))}
      <td>{totalStrokes}</td>
    </tr>
  );

  const puttsRow = (
    <tr className="bg-white">
      <th>PUTTS</th>
      {Object.values(putts).map((p) => (
        <td key={uuidv4()}>{p}</td>
      ))}
      <td>{totalPutts}</td>
    </tr>
  );

  return (
    <div className="mb-4">
      <Table responsive bordered key={roundId}>
        <thead>
          <tr className="table-dark">
            <th>HOL</th>
            <th>PAR</th>

            <th>STR</th>
            <th>PUT</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((hole) => (
            <tr key={uuidv4()}>
              <td className="table-dark">{hole.holeNumber}</td>
              <td className="table-secondary">{hole.par}</td>

              <td>{hole.strokes}</td>
              <td>{hole.putts}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoundTable;
