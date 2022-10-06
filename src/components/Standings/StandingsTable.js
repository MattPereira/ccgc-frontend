import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/** Tournament Points Table Component
 *
 * Display all points for each player in a tournament
 *
 *
 */

const StandingsTable = ({ data }) => {
  return (
    <Table responsive striped bordered variant="light" className="text-center">
      <thead>
        <tr className="table-dark">
          <th>POS</th>
          <th>NAME</th>
          <th className="d-none d-md-table-cell">PLY</th>
          <th>STR</th>
          <th>PUT</th>
          <th>GRN</th>
          <th className="d-none d-sm-table-cell">PAR</th>
          <th className="d-none d-sm-table-cell">BRD</th>
          <th className="d-none d-sm-table-cell">EGL</th>
          <th className="d-none d-sm-table-cell">ACE</th>
          <th>TOT</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.username}>
            <th>{idx + 1}</th>
            <th>
              {row.roundId ? (
                <Link
                  to={`/rounds/${row.roundId}`}
                  className="text-decoration-none"
                >
                  {row.firstName} {row.lastName[0]}
                </Link>
              ) : (
                <Link
                  to={`/members/${row.username}`}
                  className="text-decoration-none"
                >
                  {row.firstName} {row.lastName[0]}
                </Link>
              )}
            </th>
            <td className="d-none d-md-table-cell">{row.participation}</td>
            <td>{row.strokes}</td>
            <td>{row.putts}</td>
            <td>{row.greenies}</td>
            <td className="d-none d-sm-table-cell">{row.pars}</td>
            <td className="d-none d-sm-table-cell">{row.birdies}</td>
            <td className="d-none d-sm-table-cell">{row.eagles}</td>
            <td className="d-none d-sm-table-cell">{row.aces}</td>
            <td>{row.total}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StandingsTable;
