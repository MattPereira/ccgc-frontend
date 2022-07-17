import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/** Tournament Strokes Table Component
 *
 * handles display of the strokes leaderboard
 *
 * some funky if else logic going on here could be cleaned up
 *
 * IMPORT UUID FOR KEYS ON <td>'s
 *
 * TournamentDetails -> TournamentTable
 */

const TournamentStrokesTable = ({ data }) => {
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
          <th>HCP</th>
          <th>NET</th>
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
            {Object.values(r.strokes).map((s, idx) => (
              <td key={idx} className="d-none d-sm-table-cell">
                {s}
              </td>
            ))}
            <td>{r.totalStrokes}</td>
            <td>{r.courseHandicap}</td>
            <td>{r.netStrokes}</td>

            <td>{r.points}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentStrokesTable;
