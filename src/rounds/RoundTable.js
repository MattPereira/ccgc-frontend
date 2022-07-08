import React from "react";
import DataRow from "../common/DataRow";
import HolesRow from "../common/HolesRow";
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
  return (
    <div className="mb-4">
      <h5 className="display-6 mb-0">{courseName}</h5>
      <Link to={`/tournaments/${tournamentDate}`}>
        <p className="lead mb-3">
          {new Date(tournamentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </Link>
      <Table responsive bordered key={roundId}>
        <thead>
          <HolesRow />
        </thead>
        <tbody>
          {pars ? (
            <tr className="table-secondary">
              <th>PAR</th>
              {Object.values(pars).map((p) => (
                <th key={uuidv4()}>{p}</th>
              ))}
            </tr>
          ) : null}
          <DataRow
            key={uuidv4()}
            rowColor="bg-white"
            rowHeader="STROKES"
            holeValues={strokes}
            calculations={{
              total: totalStrokes,
            }}
          />

          <DataRow
            key={uuidv4()}
            rowHeader="PUTTS"
            rowColor="bg-white"
            holeValues={putts}
            calculations={{
              total: totalPutts,
            }}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default RoundTable;
