import React from "react";

/**
 *
 * TournamentDetails component is parent component
 * showing the "leaderboard" of a tournament
 * which consists of course data (pars & handicaps)
 * and the scores(putts & strokes) of each user
 *
 * path => /tournaments/:id
 *
 */

const TournamentDetails = () => {
  console.debug("TournamentDetails");
  return (
    <div>
      <h1>Tournament Leaderboard</h1>
      <p>Here the scores for a particular tournament will go</p>
    </div>
  );
};

export default TournamentDetails;
