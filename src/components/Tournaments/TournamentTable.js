import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

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

const TournamentTable = ({ data, type }) => {
  console.log("DATA", data);

  return (
    <Table responsive bordered striped variant="light">
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
          {type === "strokes" ? (
            <>
              <th>HCP</th>
              <th>NET</th>
              <th>PUT</th>
            </>
          ) : null}

          <th>
            <EditIcon />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, idx) => (
          <tr key={r.id}>
            <th>{idx + 1}</th>
            <th>
              <Link to={`/rounds/${r.id}`} className="text-decoration-none">
                {r.firstName} {r.lastName[0]}
              </Link>
            </th>
            {Object.values(r.strokes || r.putts).map((s, idx) => (
              <td key={idx} className="d-none d-sm-table-cell">
                {s}
              </td>
            ))}
            {type === "strokes" ? (
              <>
                <td>{r.totalStrokes}</td>
                <td>{r.courseHandicap}</td>
                <td>{r.netStrokes}</td>
                <td>{r.totalPutts}</td>
              </>
            ) : (
              <td>{r.totalPutts}</td>
            )}

            <td>
              <Link to={`/rounds/${r.id}/edit`}>
                <EditIcon />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
