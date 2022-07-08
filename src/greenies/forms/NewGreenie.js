import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../common/LoadingSpinner";
import GreenieForm from "./GreenieForm";

/** This component is used to fetch tournament data to pass to <NewGreenieForm/>
 *  to populate the form's golfer select field with
 *  options from the tournament
 *
 *
 *
 * Routed as /greenies/:date/new
 * Routes -> NewGreenie -> NewGreenieForm
 */

const NewGreenie = () => {
  const { date } = useParams();

  /** Fetch the tournament data first to set formData state properly */
  const [tournament, setTournament] = useState(null);

  // Grab the tournament from API to make an array of roundIds for select input
  /* On component mount, load courses from API */
  useEffect(
    function getTournamentOnMount() {
      console.debug("NewGreenie useEffect getTournamentOnMount");

      async function fetchTournament() {
        let tournament = await CcgcApi.getTournament(date);
        setTournament(tournament);
      }
      fetchTournament();
    },
    [date]
  );

  if (!tournament) return <LoadingSpinner />;
  console.log(tournament);

  // make nested array of names and corresponding roundIds for select input
  //[[98, 'Tom Moore'], [105, 'Brian Moore'], ...]
  const roundIds = tournament.strokesLeaderboard.rounds.map((r) => {
    const name = `${r.firstName} ${r.lastName}`;
    return [r.id, name];
  });

  //array of par 3 hole numbers for select input
  const par3HoleNums = Object.entries(tournament.pars)
    .filter((p) => p[1] === 3)
    .map((h) => h[0])
    .map((h) => h.split("e")[1]);
  console.log(par3HoleNums);

  return (
    <div>
      <GreenieForm roundIds={roundIds} par3HoleNums={par3HoleNums} />
    </div>
  );
};

export default NewGreenie;
