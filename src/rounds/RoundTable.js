import React from "react";
import DataRow from "../common/DataRow";
import HolesRow from "../common/HolesRow";
import { Link } from "react-router-dom";

import { Table } from "reactstrap";
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
  playerIndex,
  netStrokes,
  totalPutts,
  pars,
}) => {
  return (
    <div>
      <h5 className="display-6 mb-0">{courseName}</h5>
      <Link to={`/tournaments/${tournamentDate}`}>
        <p className="lead mb-1">
          {new Date(tournamentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </Link>
      <Table responsive bordered key={roundId}>
        <thead>
          <HolesRow extended />
        </thead>
        <tbody>
          <DataRow
            key={uuidv4()}
            rowColor="bg-white"
            rowHeader="STROKES"
            holeValues={strokes}
            calculations={{
              total: totalStrokes,
              handicap: playerIndex,
              net: netStrokes,
            }}
          />

          <DataRow
            key={uuidv4()}
            rowHeader="PUTTS"
            rowColor="bg-white"
            holeValues={putts}
            calculations={{
              total: totalPutts,
              handicap: "--",
              net: "--",
            }}
          />
          {pars ? (
            <DataRow
              rowColor="table-dark"
              rowHeader="PAR"
              holeValues={pars}
              calculations={{ handicap: "--", net: "--" }}
            />
          ) : null}
        </tbody>
      </Table>
    </div>
  );
};

export default RoundTable;
