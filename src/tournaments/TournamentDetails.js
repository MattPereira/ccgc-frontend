import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";

import TournamentTable from "./TournamentTable";

/**
 *
 * TournamentDetails component is parent component
 * showing the strokes and putts leaderboards for a
 * specific tournament
 *
 * path => /tournaments/:id
 *
 */

const TournamentDetails = () => {
  const { date } = useParams();

  console.debug("TournamentDetails");
  const [tournament, setTournament] = useState(null);

  /* On component mount, load company from API */
  useEffect(
    function getTournamentOnMount() {
      console.debug("TournamentDetails useEffect getTournamentOnMount");

      async function getTournament() {
        setTournament(await CcgcApi.getTournament(date));
      }
      getTournament();
    },
    [date]
  );

  if (!tournament) return <LoadingSpinner />;

  console.log(tournament);

  const { strokesLeaderboard, puttsLeaderboard } = tournament;

  return (
    <div className="row justify-content-center text-center">
      <h1 className="display-3 mb-3">{strokesLeaderboard.courseName}</h1>
      <hr style={{ border: "2px solid grey", width: "50%" }}></hr>
      <h4>{date}</h4>
      <div className="col-md-10">
        <TournamentTable title="STROKES" data={strokesLeaderboard} />
        <TournamentTable title="PUTTS" data={puttsLeaderboard} />
      </div>
    </div>
  );
};

export default TournamentDetails;
