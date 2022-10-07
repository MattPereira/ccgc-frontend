import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import UserContext from "../../components/Auth/UserContext";

import StandingsTable from "../../components/Standings/StandingsTable";
import TournamentTable from "../../components/Tournaments/TournamentTable";
import GreenieTable from "../../components/Greenies/GreenieTable";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import Showcase from "../../components/Tournaments/Showcase";

import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const { currentUser } = useContext(UserContext);

  const [tournament, setTournament] = useState(null);
  const [showSnack, setShowSnack] = React.useState({
    open: true,
    vertical: "bottom",
    horizontal: "center",
  });

  console.debug("TournamentDetails");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnack(false);
  };

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

  const { greenies, strokesLeaderboard, puttsLeaderboard, pointsLeaderboard } =
    tournament;

  //buttons for adding rounds and greenies to a tournament
  const AddBtn = (
    <Box sx={{ paddingBottom: "3rem" }}>
      <Button
        variant="contained"
        component={Link}
        to={`/rounds/new/${date}`}
        size="large"
        sx={{ "&:hover": { color: "white" } }}
      >
        <AddCircleOutlineIcon /> <span className="ms-2">Round</span>
      </Button>
    </Box>
  );

  return (
    <>
      <Showcase
        date={date}
        course={tournament.courseName}
        imgSrc={tournament.courseImg}
      />

      <Snackbar
        open={showSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          elevation={3}
          sx={{ width: "100%" }}
        >
          Select player's name to view round details
        </Alert>
      </Snackbar>

      <Container
        sx={{ paddingTop: "3rem", paddingBottom: "3rem", textAlign: "center" }}
      >
        {currentUser ? AddBtn : null}

        <Box sx={{ pb: 3 }}>
          <Typography variant="h3" gutterBottom>
            Strokes
          </Typography>
          <TournamentTable data={strokesLeaderboard} type="strokes" />
        </Box>

        <Box sx={{ pb: 3 }}>
          <Typography variant="h3" gutterBottom>
            Putts
          </Typography>
          <TournamentTable data={puttsLeaderboard} type="putts" />
        </Box>
        {greenies.length ? (
          <Box sx={{ pb: 3 }}>
            <Typography variant="h3" gutterBottom>
              Greenies
            </Typography>
            <div className="d-lg-none">
              <GreenieTable greenies={greenies} />
            </div>
            <div className="d-none d-lg-block">
              <GreenieCardList greenies={greenies} />
            </div>
          </Box>
        ) : null}
        <Box sx={{ pb: 3 }}>
          <Typography variant="h3" gutterBottom>
            Points
          </Typography>
          <StandingsTable data={pointsLeaderboard} />
        </Box>
      </Container>
    </>
  );
};

export default TournamentDetails;
