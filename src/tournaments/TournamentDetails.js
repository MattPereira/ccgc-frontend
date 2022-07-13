import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import HorizontalRule from "../common/HorizontalRule";

import TournamentPointsTable from "./TournamentPointsTable";
import TournamentPuttsTable from "./TournamentPuttsTable";
import TournamentStrokesTable from "./TournamentStrokesTable";
import GreenieCardList from "../greenies/GreenieCardList";
import AdminButtons from "../common/AdminButtons";

import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

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
 * Routes -> TournamentDetails -> {TournamentTable, AdminButtons}
 */

const TournamentDetails = () => {
  const { date } = useParams();
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  console.debug("TournamentDetails");
  const [tournament, setTournament] = useState(null);
  const [deletionErrors, setDeletionErrors] = useState([]);

  /* On component mount, load tournament from API */
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

  const { strokesLeaderboard, puttsLeaderboard, pointsLeaderboard } =
    tournament;

  //function to handle deletion of tournament passed to EditAndDeleteBtns
  const handleDelete = async () => {
    try {
      await CcgcApi.deleteTournament(date);
      navigate("/tournaments");
    } catch (errors) {
      setDeletionErrors(errors);
    }
  };

  //buttons for adding rounds and greenies to a tournament
  const AddBtns = (
    <div className="col-auto my-5">
      <Link to={`/rounds/new/${date}`}>
        <Button variant="primary" className="rounded-pill">
          Add Round
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="row justify-content-center text-center">
      {currentUser ? (
        currentUser.isAdmin ? (
          <AdminButtons
            updatePath={`/tournaments/${date}/update`}
            handleDelete={handleDelete}
          />
        ) : null
      ) : null}

      {deletionErrors.length
        ? deletionErrors.map((err) => (
            <Alert key={err} variant="danger">
              {err}
            </Alert>
          ))
        : null}

      <h1 className="display-1 mb-3">Tournament</h1>
      <h3 className="text-muted">{tournament.courseName}</h3>
      <HorizontalRule width="30%" />
      <h5 className="text-muted">
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h5>

      {currentUser ? AddBtns : null}
      <p className="lead mb-5">
        Select player name to view round details and add greenies.
      </p>

      <div className="col-lg-10">
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Strokes</b>
          </h3>
          <TournamentStrokesTable data={strokesLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Putts</b>
          </h3>
          <TournamentPuttsTable data={puttsLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Points</b>
          </h3>
          <TournamentPointsTable data={pointsLeaderboard} />
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
