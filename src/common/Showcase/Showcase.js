import "./Showcase.scss";
import { Row, Col } from "react-bootstrap";

const Showcase = ({ date, course, imgSrc }) => {
  console.log(course);
  return (
    <section
      style={{ background: `url(${imgSrc}) center / cover no-repeat` }}
      className="d-flex justify-content-center align-items-center showcase"
    >
      <div className="showcase-overlay"></div>
      <div className="showcase-header">
        <h2 className="text-white">
          {course.split(" ").slice(0, 2).join(" ")}
        </h2>

        <Row className="justify-content-center">
          <Col className="col-5">
            <hr style={{ color: "white", border: "1.5px solid white" }}></hr>
          </Col>
        </Row>
        <h3 className="text-white mb-0">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </h3>
      </div>
    </section>
  );
};

export default Showcase;
