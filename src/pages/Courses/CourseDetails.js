import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";
import CourseTable from "../../components/Courses/CourseTable";
import LoadingSpinner from "../../components/Common/Loading";

import { Container, Row } from "react-bootstrap";

import { Typography, Divider } from "@mui/material";

/** Course details page.
 *
 * On component mount, load the course data from API
 * which includes the pars and handicaps for the course.
 *
 * Also offer edit and delete buttons for admins users only.
 *
 * This is routed to path "/courses/:handle"
 *
 * Routes -> CourseDetails -> {AdminButtons, CourseTable}
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
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Typography variant="h1" gutterBottom>
          {course.name}
        </Typography>
        <Divider role="presentation" sx={{ mb: 5, width: "17%" }} />
        <Typography
          variant="h3"
          sx={{ fontSize: "1.35rem", marginTop: "1rem", marginBottom: "2rem" }}
        >
          Rating : {course.rating} | Slope : {course.slope}
        </Typography>
        <Row className="justify-content-center">
          <div className="col-lg-9">
            <img
              src={course.imgUrl}
              alt={`${course.name}`}
              className="img-fluid mb-0"
            />

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
        </Row>
      </Row>
    </Container>
  );
};

export default CourseDetails;
