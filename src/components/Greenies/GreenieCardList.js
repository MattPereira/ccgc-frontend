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
    <Row>
      {greenies.map((g) => (
        <Col xs={12} md={12} lg={12} xl={6} key={g.id}>
          <GreenieCard greenie={g} />
        </Col>
      ))}
    </Row>
  );
};

export default GreenieCardList;
