import "./index.scss";
import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";
import AdminButtons from "../AdminButtons";
import UserContext from "../../components/Auth/UserContext";

/**
 *
 * Showcase component for tournament details page
 *
 * Handles header of tournament details with a
 * background image of the course, the name of course,
 * and the date of the tournament.
 *
 * Also provides admin buttons for editing and deleting
 *
 */

const Showcase = ({ date, course, imgSrc, handleDelete, updatePath }) => {
  const { currentUser } = useContext(UserContext);

  console.log(course);
  return (
    <section
      style={{ background: `url(${imgSrc}) center / cover no-repeat` }}
      className="d-flex justify-content-center align-items-center showcase"
    >
      <div className="showcase-overlay"></div>
      <div className="showcase-header text-center">
        <h1 className="text-white mb-0">
          {course.split(" ").slice(0, 2).join(" ")}
        </h1>

        <Row className="justify-content-center">
          <Col className="col-5">
            <hr
              style={{
                color: "white",
                border: "1.75px solid white",
                margin: "7px",
              }}
            ></hr>
          </Col>
        </Row>

        {date ? (
          <h3 className="text-white mt-1">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </h3>
        ) : null}

        {currentUser ? (
          currentUser.isAdmin ? (
            <div className="mt-3">
              <AdminButtons
                updatePath={updatePath}
                handleDelete={handleDelete}
                light={true}
              />
            </div>
          ) : null
        ) : null}
      </div>
    </section>
  );
};

export default Showcase;
