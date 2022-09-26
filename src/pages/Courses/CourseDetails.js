import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../components/Auth/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";

import CourseTable from "../../components/Courses/CourseTable";
import HorizontalRule from "../../components/Common/HorizontalRule/HorizontalRule";
import LoadingSpinner from "../../components/Common/Loading";
import AdminButtons from "../../components/Common/AdminButtons/AdminButtons";

// import Showcase from "../components/Common/Showcase/Showcase";

import { Container, Row } from "react-bootstrap";

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
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

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

  const handleDelete = async () => {
    await CcgcApi.deleteCourse(handle);
    navigate("/courses");
  };

  console.log(course);

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <h1 className="display-3 mb-3">{course.name}</h1>
        <HorizontalRule width={"30%"} />
        <Row className="justify-content-center">
          {/* <p className="lead my-3 text-center">
            Rating : {course.rating} / {course.slope}
          </p> */}
          <div className="my-3">
            {currentUser ? (
              currentUser.isAdmin ? (
                <AdminButtons
                  updatePath={`/courses/${course.handle}/edit`}
                  handleDelete={handleDelete}
                />
              ) : null
            ) : null}
          </div>
          <div className="col-lg-9">
            <img
              src={course.imgUrl}
              alt={`${course.name}`}
              className="img-fluid mb-0 mt-3"
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
