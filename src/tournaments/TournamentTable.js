import React from "react";
import { Table } from "reactstrap";
import HolesRow from "../common/HolesRow";
import ScoresRow from "../common/ScoresRow";

/** TournamentTable component
 *
 * handles the display of both strokes and putts
 * leaderboard tables
 *
 *
 * TournamentDetails -> TournamentTable
 *
 */

const TournamentTable = ({ title, data }) => {
  return (
    <Table responsive bordered striped className="my-5">
      <thead>
        <tr className="table-dark">
          <th colSpan="22" className="h5">
            {title}
          </th>
        </tr>
        <HolesRow extended={title === "STROKES" ? true : false} />
      </thead>
      <tbody>
        {data.rounds.map((r) => (
          <ScoresRow
            key={r.id}
            rowHeader={`${r.firstName} ${r.lastName[0]}`}
            holeScores={r.strokes ? r.strokes : r.putts}
            totalScores={
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
      </tbody>
    </Table>
  );
};

export default TournamentTable;
