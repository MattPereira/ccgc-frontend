import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/** TournamentTable component
 *
 * handles displaying of the strokes and putts
 * leaderboards
 *
 * some funky if else logic going on here
 *
 * IMPORT UUID FOR KEYS ON <td>'s
 *
 * TournamentDetails -> TournamentTable
 */

const TournamentTable = ({ data }) => {
  console.log("DATA", data);

  return (
    <Table responsive bordered striped>
      <thead>
        <tr className="table-dark">
          <th>RNK</th>
          <th>PLAYER</th>
          {Array.from({ length: 18 }, (_, i) => (
            <th key={i + 1} className="d-none d-sm-table-cell">
              {i + 1}
            </th>
          ))}
          <th>TOT</th>
          {data.rounds.length > 0 ? (
            data.rounds[0].courseHandicap ? (
              <>
                <th>HCP</th>
                <th>NET</th>
              </>
            ) : null
          ) : null}
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        {data.rounds.map((r, idx) => (
          <>
            <tr>
              <th>{idx + 1}</th>
              <th>
                <Link to={`/rounds/${r.id}`}>
                  {r.firstName} {r.lastName[0]}
                </Link>
              </th>
              {r.strokes
                ? Object.values(r.strokes).map((s) => (
                    <td className="d-none d-sm-table-cell">{s}</td>
                  ))
                : null}
              {r.strokes ? (
                <>
                  <td>{r.totalStrokes}</td>
                  <td>{r.courseHandicap}</td>
                  <td>{r.netStrokes}</td>
                </>
              ) : null}
              {r.putts
                ? Object.values(r.putts).map((p) => (
                    <td className="d-none d-sm-table-cell">{p}</td>
                  ))
                : null}
              {r.putts ? <td>{r.totalPutts}</td> : null}
              <td>{r.points}</td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
