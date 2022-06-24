import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./GreenieCard.css";

/** Greenie card component.
 *
 * Show greenie username, date, hole number, feet, inches, course name, and course image.
 * GreenieCard also functions as link to each greenie's detail page.
 *
 * GreenieCard is rendered by GreenieList to show a "card" for each greenie.
 *
 * GreenieList -> GreenieCard
 *
 */

const GreenieCard = ({
  id,
  date,
  holeNumber,
  feet,
  inches,
  owner,
  courseName,
  courseImg,
}) => {
  //transform date from db format to better display format
  return (
    <div className="mb-3">
      <Link to={`/greenies/${id}`} className="TournamentCard-link">
        <Card className="GreenieCard-card">
          <CardTitle tag="h5" className="bg-success mb-0 py-2 text-white">
            {courseName}
          </CardTitle>

          <div className="GreenieCard-crop">
            <CardImg alt={`${courseName}`} src={courseImg} top />
          </div>
          <div className="bg-dark text-white h6 py-1">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <CardBody>
            <CardText className="lead">{owner}</CardText>
            <Table responsive>
              <thead>
                <tr>
                  <th>Hole</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{holeNumber}</td>
                  <td>
                    {feet}' {inches}"
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default GreenieCard;
