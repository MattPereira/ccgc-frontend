import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import HorizontalRule from "../common/HorizontalRule";

import TournamentTable from "./TournamentTable";
import EditAndDeleteBtns from "../common/EditDeleteBtns";

import { Link } from "react-router-dom";
import { Button } from "reactstrap";
/** Tournament details page.
 *
 * On component mount, load the tournament from API
 * which includes the rounds for that tournament
 *
 * The TournamentDetails component is responsible for:
 * - Displaying the strokes and putts leaderboards
 * - Offering edit and delete buttons for admins
 * - Offering new round creation buttons for all users
 *
 * This is routed to path  "/tournaments/:date"
 *
 * Routes -> TournamentDetails -> TournamentTable
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
      <h1 className="display-1 mb-3">Tournament</h1>

      <HorizontalRule width="30%" />
      <p className="lead">
        Select a player by name to view, update, or delete a round's details
      </p>
      {currentUser ? (
        currentUser.isAdmin ? (
          <EditAndDeleteBtns
            editPath={`/tournaments/${date}/edit`}
            handleDelete={handleDelete}
          />
        ) : null
      ) : null}
      <h2 className="mb-3 text-secondary">{tournament.courseName}</h2>

      <p className="lead mb-5">{displayDate}</p>
      {currentUser ? (
        <div className="mb-5">
          <Link to={`/rounds/${date}/new`}>
            <Button color="primary" className="rounded-pill">
              Input Scores
            </Button>
          </Link>
        </div>
      ) : null}
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
