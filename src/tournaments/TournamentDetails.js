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
      <p className="lead mb-5">Select a player name to view round details</p>

      <div className="col-lg-10">
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Strokes</b>
          </h3>
          <TournamentTable data={strokesLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Putts</b>
          </h3>
          <TournamentTable data={puttsLeaderboard} />
        </div>
        <div className="mb-5">
          <h3 className="display-6 mb-3">
            <b>Points</b>
          </h3>
          <Table responsive striped bordered className="text-center">
            <thead>
              <tr className="table-dark">
                <th>POS</th>
                <th>PLAYER</th>
                <th className="d-none d-md-table-cell">PLY</th>
                <th>STR</th>
                <th>PUT</th>
                <th>GRN</th>
                <th className="d-none d-sm-table-cell">PAR</th>
                <th className="d-none d-sm-table-cell">BRD</th>
                <th className="d-none d-sm-table-cell">EGL</th>
                <th className="d-none d-sm-table-cell">ACE</th>
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
                  <td className="d-none d-md-table-cell">
                    {row.participation}
                  </td>
                  <td>{row.strokes}</td>
                  <td>{row.putts}</td>
                  <td>{row.greenies}</td>
                  <td className="d-none d-sm-table-cell">{row.pars}</td>
                  <td className="d-none d-sm-table-cell">{row.birdies}</td>
                  <td className="d-none d-sm-table-cell">{row.eagles}</td>
                  <td className="d-none d-sm-table-cell">{row.aces}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
