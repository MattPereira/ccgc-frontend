import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/** TournamentTable component
 *
 * handles display of the putts leaderboard for a tournament
 *
 * IMPORT UUID FOR KEYS ON <td>'s
 *
 * TournamentDetails -> TournamentPuttsTable
 */

const TournamentPuttsTable = ({ data }) => {
  console.log("DATA", data);

  return (
    <Table responsive bordered striped>
      <thead>
        <tr className="table-dark">
          <th>POS</th>
          <th>PLAYER</th>
          {Array.from({ length: 18 }, (_, i) => (
            <th key={i + 1} className="d-none d-sm-table-cell">
              {i + 1}
            </th>
          ))}
          <th>TOT</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        {data.rounds.map((r, idx) => (
          <tr key={r.id}>
            <th>{idx + 1}</th>
            <th>
              <Link to={`/rounds/${r.id}`} className="text-decoration-none">
                {r.firstName} {r.lastName[0]}
              </Link>
            </th>

            {Object.values(r.putts).map((p, idx) => (
              <td key={idx} className="d-none d-sm-table-cell">
                {p}
              </td>
            ))}
            {r.putts ? <td>{r.totalPutts}</td> : null}
            <td>{r.points}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentPuttsTable;
