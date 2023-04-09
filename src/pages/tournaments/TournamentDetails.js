import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CcgcApi from "../../api/api";
import UserContext from "../../lib/UserContext";

import { RankingsTable } from "../standings/StandingsDetails";
// import GreenieTable from "../../components/Greenies/GreenieTable";
import GreenieCardList from "../../components/GreenieCardList";

import PageHero from "../../components/PageHero";

import { Link } from "react-router-dom";
import { Table as BootstrapTable } from "react-bootstrap";

import {
  Button,
  Container,
  Box,
  Tab,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

/** Tournament details page.
 *
 * On component mount, load the tournament from API
 * which includes all the rounds for that tournament
 *
 * The TournamentDetails component is responsible for:
 * - Displaying the scores leaderboard
 * - Displaying the skins leaderboard
 * - Displaying the greenies associated with a tournament
 * - Displaying the points leaderboard (comes from StandingsDetails component's function -> RankingsTable)
 * - Offering add round and add greenie button to logged in users
 *
 * This is routed to path  "/tournaments/:date"
 *
 * Routes -> TournamentDetails -> {StandingsTable, TournamentTable, Showcase}
 */

export default function TournamentDetails() {
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

  const AddGreenieButton = tournament.scoresLeaderboard.length ? (
    <Button
      variant="contained"
      color="success"
      component={Link}
      to={`/greenies/create/${date}`}
      size="large"
      sx={{
        "&:hover": { color: "white" },
        marginRight: "0.5rem",
        borderRadius: "30px",
      }}
    >
      <AddCircleOutlineIcon /> <span className="ms-2">Greenie</span>
    </Button>
  ) : null;

  const AddRoundButton = (
    <Button
      variant="contained"
      component={Link}
      to={`/rounds/create/${date}`}
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
      <PageHero title={tournamentDate} backgroundImage={tournament.courseImg} />
      <Container sx={{ mt: 1.5 }}>
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
              <StyledTab label="Results" value="4" />{" "}
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value="1">
            <ScoresTable data={scoresLeaderboard} type="strokes" />
            {currentUser ? AddRoundButton : null}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="2">
            {greenies.length ? (
              <>
                <div className="d-lg-none">
                  <GreeniesTable greenies={greenies} />
                </div>
                <div className="d-none d-lg-block">
                  <GreenieCardList greenies={greenies} />
                </div>
              </>
            ) : null}
            {currentUser ? AddGreenieButton : null}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="3">
            <SkinsTable
              pars={tournament.pars}
              handicaps={tournament.handicaps}
              rounds={tournament.scoresLeaderboard}
            />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="4">
            <ResultsTab
              tournament={tournament}
              pointsLeaderboard={pointsLeaderboard}
              greenies={greenies}
            />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}

function ScoresTable({ data, type }) {
  return (
    <BootstrapTable responsive bordered striped variant="light">
      <thead className="table-dark">
        <tr>
          <th>NO</th>
          <th>PLAYER</th>
          {Array.from({ length: 18 }, (_, i) => (
            <th key={i + 1} className="d-none d-sm-table-cell">
              {i + 1}
            </th>
          ))}
          <th>TOT</th>
          {type === "strokes" ? (
            <>
              <th>HCP</th>
              <th>NET</th>
              <th>PUT</th>
            </>
          ) : null}

          <th>
            <EditIcon />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, idx) => (
          <tr key={r.id}>
            <th>{idx + 1}</th>
            <th>
              <Link to={`/rounds/${r.id}`} className="text-decoration-none">
                {r.firstName} {r.lastName[0]}
              </Link>
            </th>
            {Object.values(r.strokes || r.putts).map((s, idx) => (
              <td key={idx} className="d-none d-sm-table-cell">
                {s}
              </td>
            ))}
            {type === "strokes" ? (
              <>
                <td>{r.totalStrokes}</td>
                <td>{r.courseHandicap}</td>
                <td>{r.netStrokes}</td>
                <td>{r.totalPutts}</td>
              </>
            ) : (
              <td>{r.totalPutts}</td>
            )}

            <td>
              <Button
                to={`/rounds/update/${r.id}`}
                component={Link}
                variant="contained"
                sx={{ p: 0.5, minWidth: "auto" }}
              >
                <EditIcon fontSize="small" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
}

function GreeniesTable({ greenies }) {
  console.log("GREENIES", greenies);
  return greenies.length ? (
    <BootstrapTable striped bordered>
      <thead className="table-dark">
        <tr>
          <th>PLAYER</th>
          <th>HOLE</th>
          <th>FEET</th>
          <th>INCH</th>
        </tr>
      </thead>
      <tbody>
        {greenies.map((g) => (
          <tr key={g.id}>
            <th>
              <Link
                to={`/rounds/${g.roundId}`}
                className="text-decoration-none"
              >
                {`${g.firstName} ${g.lastName[0]}`}
              </Link>
            </th>
            <td>#{g.holeNumber}</td>
            <td>{g.feet}</td>
            <td>{g.inches}</td>
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  ) : null;
}

function SkinsTable({ pars, handicaps, rounds }) {
  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledStickyColumnCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    position: "sticky",
    left: 0,
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledHolesRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    ".MuiTableCell-root": {
      color: "white",
      minWidth: "55px",
      fontWeight: "bold",
    },
  }));

  const StyledParsRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey[600],
    ".MuiTableCell-root": { color: "white", fontWeight: "bold" },
  }));

  const StyledHandicapRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "rgb(181, 148, 16)",
    ".MuiTableCell-root": { color: "white", fontWeight: "bold" },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[100],
      ".MuiTableCell-root": { backgroundColor: theme.palette.grey[100] },
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
      ".MuiTableCell-root": { backgroundColor: theme.palette.grey[200] },
    },
  }));

  console.log(rounds);
  console.log(handicaps);

  // Transform rounds data to subtract strokes for each golfer based on their handicap
  const skinsData = rounds.map((r) => {
    const strokesValues = Object.values(r.strokes);
    const handicapValues = Object.values(handicaps);

    // Create an array of objects like [{ hole: 1, strokes: 4, handicap: 5 }, ...]
    const round = strokesValues.map((value, idx) => {
      return { hole: idx + 1, strokes: value, handicap: handicapValues[idx] };
    });

    // Only adjust this many holes
    let adjustedHandicap = r.courseHandicap / 2;

    // Map over existing hole scores and adjust based on handicap
    const adjustedRound = round.map((hole) => {
      if (adjustedHandicap > 18) adjustedHandicap = 18;

      if (hole.handicap <= adjustedHandicap) {
        hole.strokes = hole.strokes - 1;
      }

      return {
        holeNumber: hole.hole,
        strokes: hole.strokes,
        handicap: hole.handicap,
      };
    });

    const playerName = r.username.split("-");
    const shortName =
      playerName[0][0].toUpperCase() + playerName[0].slice(1) + " ";

    return {
      name: shortName,
      courseHandicap: r.courseHandicap,
      round: adjustedRound,
    };
  });

  console.log(`SKINS`, skinsData);

  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #F4F4F4", mb: 1 }}
      >
        <Table size="small" sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <StyledHolesRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "grey.900" }}>
                HOLE
              </StyledStickyColumnCell>
              {Array.from({ length: 18 }, (_, i) => (
                <StyledHeaderCell align="center" key={i + 1}>
                  {i + 1}
                </StyledHeaderCell>
              ))}
            </StyledHolesRow>
            <StyledParsRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "grey.600" }}>
                PAR
              </StyledStickyColumnCell>
              {Object.values(pars).map((p, i) => (
                <StyledHeaderCell align="center" key={i}>
                  {p}
                </StyledHeaderCell>
              ))}
            </StyledParsRow>
            <StyledHandicapRow>
              <StyledStickyColumnCell
                sx={{ backgroundColor: "rgb(181, 148, 16)" }}
              >
                HANDICAP
              </StyledStickyColumnCell>
              {Object.values(handicaps).map((p, i) => (
                <StyledHeaderCell align="center" key={i}>
                  {p}
                </StyledHeaderCell>
              ))}
            </StyledHandicapRow>
          </TableHead>
          <TableBody>
            {skinsData.map((player, idx) => (
              <StyledTableRow key={idx}>
                <StyledStickyColumnCell variant="head">
                  {player.name}
                </StyledStickyColumnCell>
                {player.round.map((hole, i) => (
                  <StyledTableCell align="center" key={i}>
                    {hole.strokes}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mb: 3, textAlign: "start" }}>
        <Typography variant="p">
          *Subtract one stroke for the most difficult player handicap ÷ 2 holes
          for each player.
        </Typography>
      </Box>
    </Box>
  );
}

function ResultsTab({ tournament, pointsLeaderboard, greenies }) {
  console.log(`GREENIES`, greenies);

  const sortedByPutts = [...tournament.scoresLeaderboard].sort(
    (a, b) => a.totalPutts - b.totalPutts
  );

  console.log(`SORTED BY PUTTS`, sortedByPutts);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" align="center" gutterBottom>
              Strokes
            </Typography>
            <BootstrapTable responsive bordered striped variant="light">
              <thead className="table-dark">
                <tr>
                  <th>POSITION</th>
                  <th>NAME</th>
                  <th>NET</th>
                </tr>
              </thead>
              <tbody>
                {tournament.scoresLeaderboard.length >= 3 && (
                  <>
                    <tr>
                      <td>1</td>
                      <td>{tournament.scoresLeaderboard[0].firstName}</td>
                      <td>{tournament.scoresLeaderboard[0].netStrokes}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{tournament.scoresLeaderboard[1].firstName}</td>
                      <td>{tournament.scoresLeaderboard[1].netStrokes}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{tournament.scoresLeaderboard[2].firstName}</td>
                      <td>{tournament.scoresLeaderboard[2].netStrokes}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </BootstrapTable>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" align="center" gutterBottom>
              PUTTS
            </Typography>
            <BootstrapTable responsive bordered striped variant="light">
              <thead className="table-dark">
                <tr>
                  <th>POSITION</th>
                  <th>NAME</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {sortedByPutts.length >= 3 && (
                  <>
                    <tr>
                      <td>1</td>
                      <td>{sortedByPutts[0].firstName}</td>
                      <td>{sortedByPutts[0].totalPutts}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{sortedByPutts[1].firstName}</td>
                      <td>{sortedByPutts[1].totalPutts}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{sortedByPutts[2].firstName}</td>
                      <td>{sortedByPutts[2].totalPutts}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </BootstrapTable>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h3" gutterBottom align="center">
          Points
        </Typography>
        <RankingsTable data={pointsLeaderboard} />
      </Box>
    </>
  );
}
