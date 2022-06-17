import React from "react";
import { Table } from "reactstrap";
import DataRow from "../common/DataRow";
import HolesRow from "../common/HolesRow";

/** Course table component.
 *
 *
 *
 * accepts pars and handicaps
 *
 * renders table with course data
 *
 *
 */

const CourseTable = ({ pars, handicaps }) => {
  return (
    <Table responsive bordered hover className="text-center">
      <thead>
        <HolesRow />
      </thead>
      <tbody>
        <DataRow rowColor="bg-white" rowHeader="Par" holeValues={pars} />
        <DataRow
          rowColor="bg-white"
          rowHeader="HC"
          holeValues={handicaps}
          calculations={{ total: "--" }}
        />
      </tbody>
    </Table>
  );
};

export default CourseTable;
