import React from "react";
import { Card, CardBody, CardTitle, CardText, Table } from "reactstrap";

/**
 * CourseCard component shows
 *
 * the the pars and handicaps for each hole of a course
 *
 *
 * but its actually probably just gunna be rows
 * so that we can combo this component with
 * round scorecard (or rooundRow) components
 *
 * actually so a component with just a row
 * could possibly be used for putts,scores,
 * handicaps, and pars???
 */

const CourseCard = ({ handle, name, rating, slope, pars, handicaps }) => {
  return (
    <div className="mb-3">
      <Card body className="CompanyCard-card text-center">
        <CardBody>
          <CardTitle tag="h3" className="display-6">
            {name}
          </CardTitle>

          <CardText className="lead">
            Rating : {rating} / Slope : {slope}
          </CardText>
          <CardText></CardText>
          <Table responsive bordered className="text-center">
            <tbody>
              <tr className="bg-dark text-white">
                <th>Hole</th>
                {Array.from({ length: 18 }, (_, i) => (
                  <td key={i + 1}>{i + 1}</td>
                ))}
                <td>TOT</td>
              </tr>
              <tr>
                <th>HC</th>
                {Object.values(handicaps).map((h, idx) => (
                  <td key={idx}>{h}</td>
                ))}
                <td></td>
              </tr>
              <tr>
                <th>Par</th>
                {Object.values(pars).map((p, idx) => (
                  <td key={idx}>{p}</td>
                ))}
                <td>{Object.values(pars).reduce((a, b) => a + b, 0)}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default CourseCard;
