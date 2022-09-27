import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TournamentCard.scss";

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

const TournamentCard = ({ date, courseName, imgUrl }) => {
  return (
    <div className="mb-5">
      <Link to={`/tournaments/${date}`} className="TournamentCard-link">
        <Card className="TournamentCard">
          {/* <Card.Title
            tag="h3"
            className=" display-6 bg-dark text-white mb-0 py-3"
          >
            {courseName}
          </Card.Title> */}

          <div className="TournamentCard-crop border-rounded">
            <img alt={`${courseName}`} src={imgUrl} />
          </div>
          <Card.Body className="py-3 bg-dark text-white">
            <h3 className="mb-0">
              {" "}
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </h3>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default TournamentCard;
