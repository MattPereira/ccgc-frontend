import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import HorizontalRule from "../common/HorizontalRule";

import TournamentTable from "./TournamentTable";
import GreenieCardList from "../greenies/GreenieCardList";
import AdminButtons from "../common/AdminButtons";

import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

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

  const { strokesLeaderboard, puttsLeaderboard, pointsLeaderboard } =
    tournament;

  //function to handle deletion of tournament passed to EditAndDeleteBtns
  const handleDelete = async () => {
    await CcgcApi.deleteTournament(date);
    navigate("/tournaments");
  };

  //buttons for adding rounds and greenies to a tournament
  const AddBtns = (
    <div className="my-5 row justify-content-center">
      <div className="col-auto">
        <Link to={`/rounds/new/${date}`}>
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

      <Table responsive bordered striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>TOT</th>
            <th>HCP</th>
            <th>NET</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="col-lg-10">
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
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Points</b>
          </h3>
          <Table
            responsive
            striped
            bordered
            variant="dark"
            className="text-center"
          >
            <thead>
              <tr>
                <th>RANK</th>
                <th>PLAYER</th>
                <th>PLAY</th>
                <th>STROKE</th>
                <th>PUTT</th>
                <th>GREEN</th>
                <th>PAR</th>
                <th>BRD</th>
                <th>EGL</th>
                <th>ACE</th>
                <th>TOT</th>
              </tr>
            </thead>
            <tbody>
              {pointsLeaderboard.map((row, idx) => (
                <tr key={row.username}>
                  <th>{idx + 1}</th>
                  <th>
                    {row.firstName} {row.lastName[0]}
                  </th>
                  <td>{row.participation}</td>
                  <td>{row.strokes}</td>
                  <td>{row.putts}</td>
                  <td>{row.greenies}</td>
                  <td>{row.pars}</td>
                  <td>{row.birdies}</td>
                  <td>{row.eagles}</td>
                  <td>{row.aces}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
