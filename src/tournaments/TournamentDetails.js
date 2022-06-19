import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

import TournamentTable from "./TournamentTable";

import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

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
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  console.debug("TournamentDetails");
  const [tournament, setTournament] = useState(null);

  //popover stuff
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

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
      <hr
        style={{ border: "2px solid grey", width: "30%", marginBottom: "1rem" }}
      ></hr>
      <h2 className="mb-3 text-secondary">{tournament.courseName}</h2>

      <p className="lead mb-5">{displayDate}</p>
      {currentUser ? (
        currentUser.isAdmin ? (
          <div className="row justify-content-center mb-5">
            <div className="col-auto">
              <Link to={`/tournaments/${date}/edit`}>
                <Button color="primary" className="px-4 rounded-pill">
                  Edit
                </Button>
              </Link>
            </div>
            <div className="col-auto">
              <div>
                <Button
                  id="Popover1"
                  type="button"
                  className="btn-danger rounded-pill"
                >
                  Delete
                </Button>
                <Popover
                  flip
                  placement="bottom"
                  target="Popover1"
                  toggle={toggle}
                  isOpen={popoverOpen}
                >
                  <PopoverHeader className="bg-warning text-center">
                    WARNING!
                  </PopoverHeader>
                  <PopoverBody>
                    <p>
                      Are you sure you want to delete this tournament? This
                      action cannot be undone!
                    </p>
                    <Button
                      color="danger"
                      className="mb-5 rounded-pill"
                      onClick={handleDelete}
                    >
                      Confirm
                    </Button>
                  </PopoverBody>
                </Popover>
              </div>
            </div>
          </div>
        ) : null
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
