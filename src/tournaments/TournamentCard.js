import React from "react";
import { Card, CardTitle, CardImg } from "reactstrap";
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
    <div className="mb-5">
      <Link to={`/tournaments/${date}`} className="TournamentCard-link">
        <Card className="TournamentCard-card">
          <CardTitle tag="h3" className="bg-dark text-white mb-0 py-4">
            {courseName}
          </CardTitle>

          <div className="TournamentCard-crop">
            <CardImg alt={`${courseName}`} src={imgUrl} top />
          </div>

          <div className="bg-secondary text-white py-2">
            <h5 className="mb-0">
              {" "}
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h5>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default TournamentCard;
