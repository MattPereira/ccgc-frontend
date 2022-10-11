import React from "react";
import GreenieCard from "./GreenieCard";
import { Row } from "react-bootstrap";

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
        <div className="col-9 col-sm-6 col-md-4 col-lg-3" key={g.id}>
          <GreenieCard greenie={g} />
        </div>
      ))}
    </Row>
  );
};

export default GreenieCardList;
