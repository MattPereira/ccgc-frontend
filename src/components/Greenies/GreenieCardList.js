import React from "react";
import GreenieCard from "./GreenieCard";
import { Row, Col } from "react-bootstrap";

/** Show list of greenie cards.
 *
 * Used by both GreenieList and TournamentDetails to list GreenieCards.
 *
 *
 * GreenieList -> GreenieCardList -> GreenieCard
 * TournamentDetails -> GreenieCardList -> GreenieCard
 */

const GreenieCardList = ({ greenies }) => {
  console.debug("GreenieCardList", "greenies=", greenies);

  return (
    <Row className="justify-content-center">
      {greenies.map((g) => (
        <Col xs={12} md={10} lg={6} key={g.id}>
          <GreenieCard greenie={g} />
        </Col>
      ))}
    </Row>
  );
};

export default GreenieCardList;
