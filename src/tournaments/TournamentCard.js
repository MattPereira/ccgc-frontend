import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import "./TournamentCard.css";

/** Tournament card component.
 *
 * Show tournament tourYear, date, course name, and course image.
 * TournamentCard also functions as link to each tournament's detail page.
 *
 * TournamentCard is rendered by TournamentList to show a "card" for each tournament.
 *
 * TournamentList -> TournamentCard
 *
 */

const TournamentCard = ({ date, courseName, tourYears, imgUrl }) => {
  //transform date from db format to better display format

  return (
    <div className="mb-3">
      <Link to={`/tournaments/${date}`} className="TournamentCard-link">
        <Card className="TournamentCard-card">
          <div className="img-container">
            <CardImg alt={`${courseName}`} src={imgUrl} top />
          </div>
          <div className="bg-dark text-white h6 py-1">{tourYears} Tour</div>
          <CardBody>
            <CardTitle tag="h5">{courseName}</CardTitle>
            <CardText className="lead">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TournamentCard;
