import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import CourseTable from "./CourseTable";
import EditDeleteBtns from "../common/EditDeleteBtns";
import HorizontalRule from "../common/HorizontalRule";

/** Course details page.
 *
 * On component mount, load the course data from API
 * which includes all the rounds played at that particular course
 *
 * This is routed to path "/courses/:handle"
 *
 * Routes -> CourseDetails -> CourseCard
 *
 */

/// ADD LINKS TO GET TO INDIVIDUAL ROUND PAGE!!

const CourseDetails = () => {
  const { handle } = useParams();
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  console.debug("CourseDetails", "handle=", handle);

  const [course, setCourse] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  /* On component mount, load course data from API */
  useEffect(
    function getCourseOnMount() {
      console.debug("CourseDetails useEffect getCourseOnMount");

      async function getCourse() {
        setCourse(await CcgcApi.getCourse(handle));
      }
      getCourse();
    },
    [handle]
  );

  if (!course) return <LoadingSpinner />;

  const handleDelete = async () => {
    await CcgcApi.deleteCourse(handle);
    navigate("/courses");
  };

  return (
    <div className="text-center mb-5 row justify-content-center">
      <h1 className="display-3 mb-3">{course.name}</h1>
      <HorizontalRule width={"30%"} />

      {currentUser ? (
        currentUser.isAdmin ? (
          <EditDeleteBtns
            editPath={`/courses/${course.handle}/edit`}
            handleDelete={handleDelete}
          />
        ) : null
      ) : null}

      <img
        src={course.imgUrl}
        alt={`${course.name}`}
        className="img-fluid mb-3"
      />
      <div className="row justify-content-end">
        <div className="col-auto">Rating : {course.rating}</div>
        <div className="col-auto">Slope : {course.slope}</div>
      </div>
      <div className="mb-5">
        <CourseTable
          key={course.handle}
          handle={course.handle}
          name={course.name}
          rating={course.rating}
          slope={course.slope}
          pars={course.pars}
          handicaps={course.handicaps}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
