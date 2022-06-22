import React from "react";
import { Table } from "reactstrap";
import HolesRow from "../common/HolesRow";
import DataRow from "../common/DataRow";

/** TournamentTable component
 *
 * handles displaying of the strokes and putts
 * leaderboards
 *
 *
 * TournamentDetails -> TournamentTable -> { HolesRow, DataRow }
 */

const TournamentTable = ({ title, data }) => {
  return (
    <Table responsive bordered striped>
      <thead>
        <HolesRow extended={title === "STROKES" ? true : false} />
      </thead>
      <tbody>
        {data.rounds.map((r) => (
          <DataRow
            key={r.id}
            roundId={r.id}
            rowHeader={`${r.firstName} ${r.lastName[0]}`}
            holeValues={r.strokes ? r.strokes : r.putts}
            parValues={data.pars}
            calculations={
              r.totalStrokes
                ? {
                    total: r.totalStrokes,
                    handicap: r.courseHandicap,
                    net: r.netStrokes,
                  }
                : { total: r.totalPutts }
            }
          />
        ))}
        {data.pars ? (
          <DataRow
            rowColor="table-dark"
            rowHeader="PAR"
            holeValues={data.pars}
            calculations={{ handicap: "--", net: "--" }}
          />
        ) : null}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
