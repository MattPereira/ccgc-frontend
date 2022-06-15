import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./TournamentCard.css";

/**
 *
 * TournamentCard component is child of TournamentList
 *
 */

const TournamentCard = ({ date, courseHandle, courseName, seasonEndYEar }) => {
  date = date.slice(0, 10);
  return (
    <div className="mb-3">
      <Link to={`/tournaments/${date}`} className="TournamentCard-link">
        <Card body className="TournamentCard-card">
          <CardBody>
            <CardTitle tag="h5">{courseName}</CardTitle>
            <CardText className="lead">{date}</CardText>
            <CardText>{seasonEndYEar}</CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TournamentCard;
