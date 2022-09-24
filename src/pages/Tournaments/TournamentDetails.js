import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/Loading";
import CcgcApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../auth/UserContext";
// import HorizontalRule from "../common/HorizontalRule";

import StandingsTable from "../../standings/StandingsTable";
import TournamentTable from "../../tournaments/TournamentTable";
import GreenieTable from "../../greenies/GreenieTable";
import GreenieCardList from "../../greenies/GreenieCardList";
// import AdminButtons from "../common/AdminButtons";

import Showcase from "../../common/Showcase";

import { Link } from "react-router-dom";
import { Button, Alert, Container, Row } from "react-bootstrap";

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
 * Routes -> TournamentDetails -> {StandingsTable, TournamentTable, Showcase}
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
  console.log("TOURNAMENT", tournament);

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
    <div className="text-center mb-5">
      <Link to={`/rounds/new/${date}`}>
        <Button variant="primary" className="rounded-pill">
          Add Round
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      <Showcase
        date={date}
        course={tournament.courseName}
        imgSrc={tournament.courseImg}
        handleDelete={handleDelete}
        updatePath={`/tournaments/${date}/update`}
      />
      {/* <h2>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </h2>
      <HorizontalRule width="10%" />

      <h3>{tournament.courseName}</h3> */}

      {/* {currentUser ? (
        currentUser.isAdmin ? (
          <AdminButtons
            updatePath={`/tournaments/${date}/update`}
            handleDelete={handleDelete}
          />
        ) : null
      ) : null} */}

      {deletionErrors.length
        ? deletionErrors.map((err) => (
            <Alert key={err} variant="danger">
              {err}
            </Alert>
          ))
        : null}

      <Container className="py-5">
        <Row className="justify-content-center">
          {currentUser ? AddBtns : null}

          <p className="lead mb-5 text-center">
            Select player name to view round details and add greenies.
          </p>

          <div className="col-lg-10 text-center">
            <div className="mb-5">
              <h3 className="display-6 mb-3">
                <b>Strokes</b>
              </h3>
              <TournamentTable data={strokesLeaderboard} type="strokes" />
            </div>
            <div className="mb-5">
              <h3 className="display-6 mb-3">
                <b>Putts</b>
              </h3>
              <TournamentTable data={puttsLeaderboard} type="putts" />
            </div>
            <div className="mb-5">
              <h3 className="display-6 mb-3">
                <b>Greenies</b>
              </h3>
              {/* <div className="row justify-content-center"> */}
              <div className="d-lg-none">
                <GreenieTable greenies={tournament.greenies} />
              </div>
              <div className="d-none d-lg-block">
                <GreenieCardList greenies={tournament.greenies} />
              </div>
            </div>
            <div className="mb-5">
              <h3 className="display-6 mb-3">
                <b>Points</b>
              </h3>
              <StandingsTable data={pointsLeaderboard} />
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default TournamentDetails;
