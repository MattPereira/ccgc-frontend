import React from "react";
import GreenieCard from "./GreenieCard";

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
    <div className="row justify-content-center">
      {greenies.map((g) => (
        <div className="col-9 col-sm-6 col-md-4 col-lg-3" key={g.id}>
          <GreenieCard
            key={g.id}
            id={g.id}
            date={g.tournamentDate}
            owner={`${g.firstName} ${g.lastName}`}
            holeNumber={g.holeNumber}
            feet={g.feet}
            inches={g.inches}
            courseName={g.courseName}
            courseImg={g.courseImg}
          />
        </div>
      ))}
    </div>
  );
};

export default GreenieCardList;
