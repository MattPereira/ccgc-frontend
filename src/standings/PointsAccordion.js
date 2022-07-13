import React from "react";
import { Accordion, Table } from "react-bootstrap";

/**
 * Points Accordion with tables inside.
 */

const PointsAccordion = () => {
  return (
    <Accordion className="text-center">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Strokes</Accordion.Header>
        <Accordion.Body>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Table bordered striped variant="dark">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1st</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>2nd</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>3rd</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>4th</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>5th</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Putts</Accordion.Header>
        <Accordion.Body>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Table bordered variant="dark" striped>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1st</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>2nd</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>3rd</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Greenies</Accordion.Header>
        <Accordion.Body>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Table bordered variant="dark" striped>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Greenie</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Inside 20'</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Inside 10'</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Inside 2'</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Events</Accordion.Header>
        <Accordion.Body>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Table bordered variant="dark" striped>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Participation</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Par</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Birdie</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Eagle</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Hole-In-One</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default PointsAccordion;
