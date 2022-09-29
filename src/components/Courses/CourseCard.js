import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CourseCard.scss";

/** Course card component.
 *
 * Show information about a golf course
 *
 * CourseCard is rendered by CourseList to show a "card" for each course.
 *
 * CourseList -> CourseCard
 */

const CourseCard = ({ handle, rating, slope, name, imgUrl }) => {
  return (
    <div className="mb-5">
      <Link to={`/courses/${handle}`} className="CourseCard-link">
        <Card className="CourseCard-card text-center">
          <div className="CourseCard-crop">
            <img alt={`${name}`} src={imgUrl} />
          </div>
          <Card.Title
            tag="h3"
            className="display-6 bg-dark mb-0 py-3 text-white"
          >
            {name}
          </Card.Title>
          {/* <Card.Body className="bg-primary text-white py-2">
            <Card.Text className="lead fw-bold">
              Rating {rating}/{slope}
            </Card.Text>
          </Card.Body> */}
        </Card>
      </Link>
    </div>
  );
};

export default CourseCard;