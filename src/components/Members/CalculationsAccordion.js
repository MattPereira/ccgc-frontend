import React from "react";
import { Accordion } from "react-bootstrap";

/**
 * Calculations Accordion
 */

const CalculationsAccordion = () => {
  return (
    <Accordion variant="dark">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Total Strokes</Accordion.Header>
        <Accordion.Body>
          <p className="lead fw-bold">Hole1 + Hole2 + ... + Hole18</p>
          <p>Sum of the strokes for all 18 holes.</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Score Differential</Accordion.Header>
        <Accordion.Body>
          <p className="lead fw-bold">
            ( 113 / Slope ) × ( Total Strokes − Rating )
          </p>
          <p>
            Measures the performance of a round in relation to the relative
            difficulty of the course that was played.
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Player Index</Accordion.Header>
        <Accordion.Body>
          <p className="lead fw-bold">( Two lowest score diffs ) / 2</p>
          <p>Avg of lowest 2 score differentials out of last 4 rounds</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Course Handicap</Accordion.Header>
        <Accordion.Body>
          <p className="lead fw-bold">
            ( Handicap Index × Course Slope ) / 113
          </p>
          <p>The number to subtract from total strokes to get net strokes.</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Net Strokes</Accordion.Header>
        <Accordion.Body>
          <p className="lead fw-bold">Total Strokes − Course Handicap</p>
          <p>
            Net strokes is used to determine the finishing order for players in
            each tournament.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CalculationsAccordion;
