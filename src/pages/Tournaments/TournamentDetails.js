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
import { Button, Typography, Container, Box, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tournament, setTournament] = useState(null);
  console.debug("TournamentDetails");

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
  const AddBtns = (
    <Box sx={{ paddingBottom: "3rem" }}>
      <Button
        variant="contained"
        color="success"
        component={Link}
        to={`/greenies/new/${date}`}
        size="large"
        sx={{ "&:hover": { color: "white" }, marginRight: "0.5rem" }}
      >
        <AddCircleOutlineIcon /> <span className="ms-2">Greenie</span>
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={`/rounds/new/${date}`}
        size="large"
        sx={{
          "&:hover": { color: "white" },
          width: "138.906px",
          marginLeft: "0.5rem",
        }}
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

      <Container sx={{ pt: 1.5, textAlign: "center" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Strokes" value="1" />
              <Tab label="Putts" value="2" />
              <Tab label="Greenies" value="3" />
              <Tab label="Points" value="4" />
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value="1">
            <TournamentTable data={strokesLeaderboard} type="strokes" />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="2">
            <TournamentTable data={puttsLeaderboard} type="putts" />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="3">
            {greenies.length ? (
              <>
                <div className="d-lg-none">
                  <GreenieTable greenies={greenies} />
                </div>
                <div className="d-none d-lg-block">
                  <GreenieCardList greenies={greenies} />
                </div>
              </>
            ) : (
              <div>No greenies yet!</div>
            )}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="4">
            <StandingsTable data={pointsLeaderboard} />
          </TabPanel>
        </TabContext>

        {currentUser ? AddBtns : null}

        {/* <Box sx={{ pb: 3 }}>
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
        <Box sx={{ pb: 3 }}>
          <Typography variant="h3" gutterBottom>
            Points
          </Typography>
          <StandingsTable data={pointsLeaderboard} />
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
        ) : null} */}
      </Container>
    </>
  );
};

export default TournamentDetails;
