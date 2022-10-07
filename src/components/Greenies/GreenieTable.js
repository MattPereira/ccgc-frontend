import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/** Greenies Table component.
 *
 * Display a table of greenies showing:
 * - player name
 * - hole number
 * - feet
 * - inches
 *
 * MemberDetails -> GreenieTable
 * TournamentDetails -> GreenieTable
 */

const GreenieTable = ({ greenies }) => {
  console.log("GREENIES", greenies);
  return greenies.length ? (
    <Table striped bordered>
      <thead className="table-dark">
        <tr>
          <th>PLAYER</th>
          <th>HOLE</th>
          <th>FEET</th>
          <th>INCH</th>
        </tr>
      </thead>
      <tbody>
        {greenies.map((g) => (
          <tr key={g.id}>
            <th>
              <Link
                to={`/rounds/${g.roundId}`}
                className="text-decoration-none"
              >
                {`${g.firstName} ${g.lastName[0]}`}
              </Link>
            </th>
            <td>#{g.holeNumber}</td>
            <td>{g.feet}</td>
            <td>{g.inches}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : null;
};

export default GreenieTable;
