import React from "react";
import { Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GreenieCard.css";

/** Greenie card component.
 *
 * Show greenie username, date, hole number, feet, inches, course name, and course image.
 * GreenieCard also functions as link to each greenie's detail page.
 *
 * GreenieCard is rendered by GreenieList and GreenieDetails
 *  to show a "card" for each greenie.
 *
 * On the GreenieDetails page, show edit and delete buttons
 * for logged in same user or admin only.
 *
 * GreenieList -> GreenieCard
 * GreenieDetails -> GreenieCard
 *
 */

const GreenieCard = ({ greenie }) => {
  const {
    id,
    holeNumber,
    feet,
    inches,
    firstName,
    lastName,
    courseName,
    courseImg,
  } = greenie;
  return (
    <div className="mb-3">
      <Link to={`/greenies/${id}`} className="TournamentCard-link">
        <Card className="GreenieCard-card">
          <Card.Title tag="h5" className="bg-dark mb-0 py-2 text-white fw-bold">
            {courseName.split(" ").slice(0, 2).join(" ")}
          </Card.Title>

          <div className="GreenieCard-crop">
            <img alt={`${courseName}`} src={courseImg} />
          </div>
          <div className="bg-success text-white h6 py-1">
            <Card.Text className="lead fw-bold">
              {firstName} {lastName}
            </Card.Text>
          </div>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Hole</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#{holeNumber}</td>
                  <td>
                    {feet}' {inches}"
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default GreenieCard;
