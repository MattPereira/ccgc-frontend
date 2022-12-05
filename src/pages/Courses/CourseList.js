import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import CourseCard from "../../components/Courses/CourseCard";

import { Typography, Divider, Container, Grid } from "@mui/material";

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
      <Typography variant="h1">Golf Courses</Typography>
      <Divider role="presentation" style={{ width: "17%" }} />
      <Grid container spacing={3} justifyContent="center">
        {courses.map((c) => (
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <CourseCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              rating={c.rating}
              slope={c.slope}
              imgUrl={c.imgUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
