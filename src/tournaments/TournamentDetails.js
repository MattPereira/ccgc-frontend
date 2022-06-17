import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";

import TournamentTable from "./TournamentTable";

/** Tournament details page.
 *
 * On component mount, load the tournament from API
 * which includes the rounds for that tournament
 *
 * This is routed to path  "/tournaments/:date"
 *
 * Routes -> TournamentDetails -> TournamentTable
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

      <hr
        style={{ border: "2px solid grey", width: "50%", marginBottom: "5px" }}
      ></hr>
      <p className="lead mb-5">{date}</p>

      <div className="col-md-10">
        <div className="mb-5">
          <h3 className="display-6">
            <b>Strokes</b>
          </h3>
          <TournamentTable title="STROKES" data={strokesLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6">
            <b>Putts</b>
          </h3>
          <TournamentTable title="PUTTS" data={puttsLeaderboard} />
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
