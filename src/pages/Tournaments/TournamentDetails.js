import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../components/Auth/UserContext";
// import HorizontalRule from "../components/Common/HorizontalRule";

import StandingsTable from "../../components/Standings/StandingsTable";
import TournamentTable from "../../components/Tournaments/TournamentTable";
import GreenieTable from "../../components/Greenies/GreenieTable";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
// import AdminButtons from "../components/Common/AdminButtons";

import Showcase from "../../components/Tournaments/Showcase";

import { Link } from "react-router-dom";
import { Alert, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";

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
  const AddBtn = (
    <div className="pb-5 text-center">
      <Button
        variant="contained"
        component={Link}
        to={`/rounds/new/${date}`}
        size="large"
        sx={[{ "&:hover": { color: "white" } }]}
      >
        Add A Round
      </Button>
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

      {deletionErrors.length
        ? deletionErrors.map((err) => (
            <Alert key={err} variant="danger">
              {err}
            </Alert>
          ))
        : null}

      <Container className="py-5">
        <Row className="justify-content-center">
          {currentUser ? AddBtn : null}

          {/* <p className="lead py-5 text-center">
            Select player name to view round details and add greenies.
          </p> */}

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
