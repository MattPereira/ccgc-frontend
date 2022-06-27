import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseTable from "./CourseTable";

import "./CourseCard.css";

/** Course card component.
 *
 * Show information about a golf course
 *
 * CourseCard is rendered by CourseList to show a "card" for each course.
 *
 * CourseList -> CourseCard
 */

const CourseCard = ({
  handle,
  name,
  rating,
  slope,
  pars,
  handicaps,
  imgUrl,
}) => {
  return (
    <div className="mb-3">
      <Link to={`/courses/${handle}`} className="CourseCard-link">
        <Card className="CourseCard-card text-center">
          <Card.Title
            tag="h3"
            className="display-6 bg-dark mb-0 py-3 text-white"
          >
            {name}
          </Card.Title>
          <div className="CourseCard-crop">
            <img alt={`${name}`} src={imgUrl} />
          </div>
          <Card.Body>
            {/* <div className="row justify-content-center mb-3">
              <div className="col-auto">Rating : {rating}</div>
              <div className="col-auto">Slope : {slope}</div>
            </div> */}
            <CourseTable pars={pars} handicaps={handicaps} />
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CourseCard;
