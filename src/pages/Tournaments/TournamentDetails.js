import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import UserContext from "../../components/Auth/UserContext";

import StandingsTable from "../../components/Standings/StandingsTable";
import ScoresTable from "../../components/Tournaments/TournamentScoresTable";
import SkinsTable from "../../components/Tournaments/TournamentSkinsTable";
import GreenieTable from "../../components/Greenies/GreenieTable";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import TournamentHero from "../../components/Tournaments/TournamentHero";

import { Link } from "react-router-dom";
import { Button, Container, Box, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
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
 * - Displaying the scores leaderboard
 * - Offering add round and add greenie button
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
      {tournament.scoresLeaderboard.length ? (
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
      ) : null}
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

  const tournamentDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const StyledTab = styled(Tab)(({ theme }) => ({
    fontFamily: "Cubano",
    fontSize: "1.15rem",
  }));

  return (
    <>
      <TournamentHero date={tournamentDate} courseImg={tournament.courseImg} />
      <Container sx={{ mt: 1.5, textAlign: "center" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <StyledTab label="Scores" value="1" />
              <StyledTab label="Greenies" value="2" />
              <StyledTab label="Skins" value="3" />
              <StyledTab label="Points" value="4" />{" "}
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value="1">
            <ScoresTable data={scoresLeaderboard} type="strokes" />
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
            <SkinsTable
              pars={tournament.pars}
              handicaps={tournament.handicaps}
              rounds={tournament.scoresLeaderboard}
            />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="4">
            <StandingsTable data={pointsLeaderboard} />
          </TabPanel>
        </TabContext>

        {currentUser ? AddBtns : null}
      </Container>
    </>
  );
};

export default TournamentDetails;
