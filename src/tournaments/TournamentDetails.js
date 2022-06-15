import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import StrokesRow from "../rounds/StrokesRow";
import PuttsRow from "../rounds/PuttsRow";
import HolesRow from "../common/HolesRow";

import { Table } from "reactstrap";

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
  const { date } = useParams();

  console.debug("TournamentDetails");
  const [tournament, setTournament] = useState(null);

  console.log(date);

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

  // const tournamentDate = tournament.date.slice(0, 10);
  const { strokesLeaderboard, puttsLeaderboard } = tournament;

  return (
    <div className="row justify-content-center text-center">
      <h1 className="display-3 mb-3">{strokesLeaderboard.courseName}</h1>
      <hr style={{ border: "2px solid grey", width: "50%" }}></hr>
      <h4>{date}</h4>
      <div className="col-md-10">
        <Table responsive bordered striped className="my-5">
          <thead>
            <tr className="table-dark">
              <th colSpan="22">STROKES</th>
            </tr>
            <HolesRow extended={true} />
          </thead>
          <tbody>
            {strokesLeaderboard.rounds.map((r) => (
              <StrokesRow
                key={r.id}
                id={r.id}
                username={r.username}
                strokes={r.strokes}
                totalStrokes={r.totalStrokes}
                courseHandicap={r.courseHandicap}
                netStrokes={r.netStrokes}
              />
            ))}
          </tbody>
        </Table>
        <Table responsive bordered striped className="my-5">
          <thead>
            <tr className="table-dark">
              <th colSpan="22">PUTTS</th>
            </tr>
            <HolesRow extended={false} />
          </thead>
          <tbody>
            {puttsLeaderboard.rounds.map((r) => (
              <PuttsRow
                key={r.id}
                id={r.id}
                username={r.username}
                putts={r.putts}
                totalPutts={r.totalPutts}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TournamentDetails;
