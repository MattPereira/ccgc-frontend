import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import HorizontalRule from "../common/HorizontalRule";

import TournamentTable from "./TournamentTable";
import GreenieCardList from "../greenies/GreenieCardList";
import EditAndDeleteBtns from "../common/EditAndDeleteBtns";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
/** Tournament details page.
 *
 * On component mount, load the tournament from API
 * which includes all the rounds for that tournament
 *
 * The TournamentDetails component is responsible for:
 * - Displaying the strokes and putts leaderboards
 * - Offering tournament edit and delete buttons for admins
 * - Offering new round creation buttons for all users
 *
 * This is routed to path  "/tournaments/:date"
 *
 * Routes -> TournamentDetails -> {TournamentTable, EditAndDeleteBtns}
 */

const TournamentDetails = () => {
  const { date } = useParams();
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

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

  const { strokesLeaderboard, puttsLeaderboard } = tournament;

  console.log(tournament);

  //transform date from db format to better display format
  const dateObj = new Date(date);
  const displayDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = async () => {
    await CcgcApi.deleteTournament(date);
    navigate("/tournaments");
  };

  return (
    <div className="row justify-content-center text-center">
      {currentUser ? (
        currentUser.isAdmin ? (
          <EditAndDeleteBtns
            editPath={`/tournaments/${date}/edit`}
            handleDelete={handleDelete}
          />
        ) : null
      ) : null}
      <h1 className="display-1 mb-3">Tournament</h1>
      <h3 className="text-muted">{tournament.courseName}</h3>
      <HorizontalRule width="30%" />
      <h5 className="text-muted">{displayDate}</h5>

      {currentUser ? (
        <div className="my-5 row justify-content-center">
          <div className="col-auto">
            <Link to={`/rounds/${date}/new`}>
              <Button variant="primary" className="rounded-pill">
                Add Round
              </Button>
            </Link>
          </div>
          {tournament.strokesLeaderboard.rounds.length === 0 ? null : (
            <div className="col-auto">
              <Link to={`/greenies/${date}/new`}>
                <Button variant="success" className="rounded-pill">
                  Add Greenie
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : null}
      <div className="col-md-10">
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Strokes</b>
          </h3>
          <TournamentTable title="STROKES" data={strokesLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Putts</b>
          </h3>
          <TournamentTable title="PUTTS" data={puttsLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Greenies</b>
          </h3>
          <GreenieCardList greenies={tournament.greenies} />
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
