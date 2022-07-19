import React from "react";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import "./MemberCard.css";

/** Member card component.
 *
 * Show information about a member
 * MemberCard also functions as link to each member's detail page.
 *
 * MemberCard is rendered by MemberList to show a "card" for each member.
 *
 * MemberList -> MemberCard
 */

const MemberCard = ({
  username,
  firstName,
  lastName,
  avgPutts,
  avgStrokes,
  avgGreenies,
}) => {
  return (
    <div className="mb-5 text-center">
      <Link to={`/members/${username}`} className="MemberCard-link">
        <Card className="MemberCard-card">
          <Card.Title
            tag="h5"
            className="text-white py-3 mb-0 MemberCard-title"
          >
            {firstName} {lastName}
          </Card.Title>
          <Card.Body>
            <div className="row justify-content-center">
              <div className="col-10">
                <Table>
                  <thead>
                    <tr>
                      <th colSpan="2">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Strokes</td>
                      <td>{avgStrokes}</td>
                    </tr>
                    <tr>
                      <td>Putts</td>
                      <td>{avgPutts}</td>
                    </tr>
                    <tr>
                      <td>Greenies</td>
                      <td>{avgGreenies}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default MemberCard;
