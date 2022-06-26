import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
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

const MemberCard = ({ username, email, firstName, lastName, bio }) => {
  return (
    <div className="mb-3 text-center">
      <Link to={`/members/${username}`} className="MemberCard-link">
        <Card body className="MemberCard-card">
          <Card.Body>
            <Card.Title tag="h5">
              {firstName} {lastName}
            </Card.Title>
            <Card.Text className="mb-2">{email}</Card.Text>
            <Card.Text>
              <i>{bio}</i>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default MemberCard;
