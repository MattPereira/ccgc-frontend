import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import CourseTable from "./CourseTable";

import "./CourseCard.css";

/**
 * Course card component.
 *
 *
 * show information about a golf course
 *
 * CourseCard is rendered by CourseList to show a
 * "card" for each course.
 *
 * CourseList -> CourseCard
 */

const CourseCard = ({ handle, name, rating, slope, pars, handicaps }) => {
  return (
    <div className="mb-3">
      <Link to={`/courses/${handle}`} className="CourseCard-link">
        <Card body className="CourseCard-card text-center">
          <CardBody>
            <CardTitle tag="h3" className="display-6">
              {name}
            </CardTitle>

            <CardText className="lead">
              Rating : {rating} / Slope : {slope}
            </CardText>
            <CourseTable pars={pars} handicaps={handicaps} />
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default CourseCard;
