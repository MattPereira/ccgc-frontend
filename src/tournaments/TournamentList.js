import React from "react";

/**
 *
 * TournamentList component is parent component
 * that will render TournamentCard components
 * that serve as links to get to TournamentDetails component
 *
 * path => /tournaments
 *
 */

const TournamentList = () => {
  console.debug("TournamentList");
  return (
    <div className="text-center">
      <h1 className="display-3">List All Tournaments</h1>
      <p>Tournament Card</p>
      <p>Tournament Card</p>
      <p>Tournament Card</p>
    </div>
  );
};

export default TournamentList;
