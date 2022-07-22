import React from "react";
import { Table } from "react-bootstrap";
import HolesRow from "../common/HolesRow";

import { v4 as uuidv4 } from "uuid";

/** Course table component.
 *
 * accepts pars and handicaps
 *
 * renders table with course data
 *
 */

const CourseTable = ({ pars, handicaps }) => {
  return (
    <Table responsive bordered hover className="text-center">
      <thead>
        <HolesRow />
      </thead>
      <tbody>
        <tr className="table-secondary">
          <th>PAR</th>
          {Object.values(pars).map((p) => (
            <td key={uuidv4()}>{p}</td>
          ))}
        </tr>

        <tr className="bg-white">
          <th>HCP</th>
          {Object.values(handicaps).map((h) => (
            <td key={uuidv4()}>{h}</td>
          ))}
          <td>--</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CourseTable;
