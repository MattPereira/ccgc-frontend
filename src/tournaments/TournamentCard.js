import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import "./TournamentCard.css";

/**
 *
 * TournamentCard component is child of TournamentList
 *
 */

const TournamentCard = ({
  date,
  courseHandle,
  courseName,
  tourYears,
  imgUrl,
}) => {
  //transform date from db format to better display format
  const dateObj = new Date(date);
  const displayDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-3">
      <Link to={`/tournaments/${date}`} className="TournamentCard-link">
        <Card className="TournamentCard-card">
          <CardImg alt={`${courseName} photo`} src={imgUrl} top />
          <div className="bg-primary text-white h6 py-1">{tourYears} Tour</div>
          <CardBody>
            <CardTitle tag="h5">{courseName}</CardTitle>
            <CardText className="lead">{displayDate}</CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TournamentCard;
