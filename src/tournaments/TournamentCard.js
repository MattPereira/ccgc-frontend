import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 *
 * TournamentCard component is child of TournamentList
 *
 */

const TournamentCard = ({ date, courseHandle, courseName, seasonEndYEar }) => {
  return (
    <div className="mb-3">
      <Card body className="TournamentCard">
        <CardTitle>{courseName}</CardTitle>
        <CardText>{date.replace("T07:00:00.000Z", "")}</CardText>
        <CardText>{seasonEndYEar}</CardText>
      </Card>
    </div>
  );
};

export default TournamentCard;
