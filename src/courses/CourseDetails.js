import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

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
    <div className="text-center">
      <h1 className="display-3 mb-5">{course.name}</h1>
      <h5 className="display-6 mb-3">Rating : {course.rating}</h5>
      <h5 className="display-6 mb-3">Slope : {course.slope}</h5>
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

      {currentUser ? (
        currentUser.isAdmin ? (
          <div className="row justify-content-end">
            <div className="col-auto">
              <Link to={`/courses/${course.handle}/edit`}>
                <Button color="primary" className="px-4 rounded-pill">
                  Edit
                </Button>
              </Link>
            </div>
            <div className="col-auto">
              <div>
                <Button
                  id="Popover1"
                  type="button"
                  className="btn-danger rounded-pill"
                >
                  Delete
                </Button>
                <Popover
                  flip
                  placement="bottom"
                  target="Popover1"
                  toggle={toggle}
                  isOpen={popoverOpen}
                >
                  <PopoverHeader className="bg-warning text-center">
                    Danger!
                  </PopoverHeader>
                  <PopoverBody>
                    <p>
                      Are you sure you want to delete this course? Cannot be
                      undone!
                    </p>
                    <Button
                      color="danger"
                      className="mb-5 rounded-pill"
                      onClick={handleDelete}
                    >
                      Confirm
                    </Button>
                  </PopoverBody>
                </Popover>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default CourseDetails;
