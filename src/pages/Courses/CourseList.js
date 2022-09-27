import React, { useState, useEffect, useContext } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import CourseCard from "../../components/Courses/CourseCard";
import UserContext from "../../components/Auth/UserContext";
import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";

/** Show page with all courses listed
 *
 * On component mount, load courses from API
 *
 * This is routed to path "/courses"
 *
 * Router -> CourseList -> CourseCard
 */

const CourseList = () => {
  const { currentUser } = useContext(UserContext);

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
    <Container className="py-5">
      <div className="text-center row justify-content-center">
        <h1 className="display-1 mb-3">Courses</h1>
        <hr style={{ border: "2px solid grey", width: "20%" }}></hr>
        {currentUser ? (
          currentUser.isAdmin ? (
            <div className="py-5">
              <Button
                variant="contained"
                component={Link}
                to="/courses/new"
                size="large"
                sx={[{ "&:hover": { color: "white" } }]}
              >
                Add Course
              </Button>
            </div>
          ) : null
        ) : null}
        <p className="lead py-5">
          List of all golf courses. Select a course to see details.
        </p>

        <div className="CourseList col-sm-11 col-md-9 col-lg-8">
          {courses.map((c) => (
            <CourseCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              rating={c.rating}
              slope={c.slope}
              imgUrl={c.imgUrl}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CourseList;
