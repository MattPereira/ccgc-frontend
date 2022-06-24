import React from "react";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
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
          <CardTitle
            tag="h3"
            className="display-6 bg-dark mb-0 py-3 text-white"
          >
            {name}
          </CardTitle>
          <div className="CourseCard-crop">
            <CardImg alt={`${name} photo`} src={imgUrl} top />
          </div>
          <CardBody>
            {/* <div className="row justify-content-center mb-3">
              <div className="col-auto">Rating : {rating}</div>
              <div className="col-auto">Slope : {slope}</div>
            </div> */}
            <CourseTable pars={pars} handicaps={handicaps} />
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default CourseCard;
