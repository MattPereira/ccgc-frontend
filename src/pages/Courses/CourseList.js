import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import CourseCard from "../../components/Courses/CourseCard";
import { Container, Col } from "react-bootstrap";

/** Show page with all courses listed
 *
 * On component mount, load courses from API to pass to CourseCard
 *
 * This is routed to path "/courses"
 *
 * Router -> CourseList -> CourseCard
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
    <Container className="py-5">
      <div className="text-center row justify-content-center">
        <h1 className="display-1 mb-3">Courses</h1>
        <hr style={{ border: "2px solid grey", width: "20%" }}></hr>
        <p className="lead py-5">
          List of all golf courses. Select a course to see details.
        </p>

        <Col md={10} lg={8} xl={7} className="CourseList">
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
        </Col>
      </div>
    </Container>
  );
};

export default CourseList;
