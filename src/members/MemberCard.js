import React from "react";
// import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/** Member card component.
 *
 * Show information about a member
 *
 * MemberCard is rendered by MemberList to show a "card" for each member.
 *
 * MemberList -> MemberCard
 */

const MemberCard = ({ username, email, firstName, lastName, bio }) => {
  return (
    <div className="mb-3">
      <Card body className="CompanyCard-card">
        <CardBody>
          <CardTitle tag="h5">
            {firstName} {lastName}
          </CardTitle>

          <CardText>username: {username}</CardText>
          <CardText>email: {email}</CardText>
          <CardText>bio: {bio}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default MemberCard;
