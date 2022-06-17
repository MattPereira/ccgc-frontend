import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import CourseTable from "./CourseTable";

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

const CourseDetails = () => {
  const { handle } = useParams();

  console.debug("CourseDetails", "handle=", handle);

  const [course, setCourse] = useState(null);

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

  console.log(course);

  return (
    <div className="text-center">
      <h1 className="display-3 mb-5">{course.name}</h1>
      <h5 className="display-6 mb-3">Rating : {course.rating}</h5>
      <h5 className="display-6 mb-3">Slope : {course.slope}</h5>
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
  );
};

export default CourseDetails;
