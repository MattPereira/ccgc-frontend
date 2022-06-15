import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./MemberCard.css";

/** Member card component.
 *
 * Show information about a member and function as link to member's detail page.
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
          <CardBody>
            <CardTitle tag="h5">
              {firstName} {lastName}
            </CardTitle>
            <CardText className="mb-2">{email}</CardText>
            <CardText>
              <i>{bio}</i>
            </CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default MemberCard;
