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
import { Button, Container, Box, Tab } from "@mui/material";
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

  const { greenies, scoresLeaderboard, pointsLeaderboard } = tournament;

  //buttons for adding rounds and greenies to a tournament
  const AddBtns = (
    <Box sx={{ pb: 5 }}>
      <Button
        variant="contained"
        color="success"
        component={Link}
        to={`/greenies/new/${date}`}
        size="large"
        sx={{
          "&:hover": { color: "white" },
          marginRight: "0.5rem",
          borderRadius: "30px",
        }}
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
          borderRadius: "30px",
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
          <Box>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Scores"
                value="1"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
              <Tab
                label="Greenies"
                value="2"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
              <Tab
                label="Points"
                value="3"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value="1">
            <TournamentTable data={scoresLeaderboard} type="strokes" />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="2">
            {greenies.length ? (
              <>
                <div className="d-lg-none">
                  <GreenieTable greenies={greenies} />
                </div>
                <div className="d-none d-lg-block">
                  <GreenieCardList greenies={greenies} />
                </div>
              </>
            ) : null}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="3">
            <StandingsTable data={pointsLeaderboard} />
          </TabPanel>
        </TabContext>

        {currentUser ? AddBtns : null}
      </Container>
    </>
  );
};

export default TournamentDetails;
