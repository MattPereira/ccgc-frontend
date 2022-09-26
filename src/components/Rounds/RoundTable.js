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
      <h5 className="display-6 mb-0">{courseName}</h5>
      <Link to={`/tournaments/${tournamentDate}`}>
        <p className="fs-5 mb-3">
          {new Date(tournamentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </Link>
      <Table responsive bordered key={roundId}>
        <thead>
          <HolesRow />
        </thead>
        <tbody>
          {parsRow}

          {strokesRow}

          {puttsRow}
        </tbody>
      </Table>
    </div>
  );
};

export default RoundTable;
