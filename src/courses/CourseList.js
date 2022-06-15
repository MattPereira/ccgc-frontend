import React, { useState, useEffect } from "react";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import CourseCard from "./CourseCard";

/** Show page with all courses listed
 *
 * On component mount, load courses from API
 *
 * This is routed to path "/courses"
 *
 * Routes -> CourseCard
 */

const CourseList = () => {
  console.debug("CourseList");

  const [courses, setCourses] = useState(null);

  /* On component mount, load courses from API */
  useEffect(function getCoursesOnMount() {
    console.debug("CourseList useEffect getCoursesOnMount");

    async function fetchAllCourses() {
      let courses = await CcgcApi.getCourses();
      setCourses(courses);
    }
    fetchAllCourses();
  }, []);

  if (!courses) return <LoadingSpinner />;

  return (
    <div className="text-center">
      <h1 className="display-3 mb-3">Golf Courses</h1>
      <p className="lead mb-5">
        Information about the rating, slope, pars, and handicaps for each course
        played by the Contra Costa Golf Club.
      </p>
      <div className="CourseList col-md-10 offset-md-1">
        {courses.map((c) => (
          <CourseCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            rating={c.rating}
            slope={c.slope}
            pars={c.pars}
            handicaps={c.handicaps}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
