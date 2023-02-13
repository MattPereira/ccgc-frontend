import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";

import PageHero from "../../components/Common/PageHero/PageHero";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Typography,
  Container,
  Box,
  Modal,
  Tab,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

/** Round details page.
 *
 * On component mount, load the round data from API
 * which includes the strokes, putts, and calculations
 * for each round
 *
 * Only show edit and delete buttons if user isAdmin or
 * if the user is the owner of the round
 *
 * Router -> RoundDetails -> {AdminButtons, RoundTable}
 */

const RoundDetails = () => {
  const theme = useTheme();
  console.log(theme);

  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  let navigate = useNavigate();

  console.debug("RoundDetails", "id=", id);

  const [round, setRound] = useState(null);

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    await CcgcApi.deleteRound(id);
    navigate(`/tournaments/${round.tournamentDate}`);
  };

  /* On component mount, load round data from API */
  useEffect(
    function getRoundOnMount() {
      console.debug("RoundDetails useEffect getRoundOnMount");

      async function getRound() {
        setRound(await CcgcApi.getRound(id));
      }
      getRound();
    },
    [id]
  );

  if (!round) return <LoadingSpinner />;
  console.log(round);

  //Logic for computing course handicap for a round
  //Need to add logic to check if this round is the most recent round for a user? if it is not the most recent, show text explaining that handicap calculation can only be seen on most recent round?

  const scoreDiffsArray = round.recentScoreDiffs.map(
    (diff) => +diff.scoreDifferential
  );
  console.log("All Diffs", scoreDiffsArray);

  const lowestTwoDiffs = scoreDiffsArray.sort((a, b) => a - b).slice(0, 2);
  console.log("Lowest Two Diffs", lowestTwoDiffs);

  let playerIndex = 0;

  if (lowestTwoDiffs.length) {
    playerIndex = (
      lowestTwoDiffs.reduce((a, b) => a + b) / lowestTwoDiffs.length
    ).toFixed(2);
  }

  const courseHandicap = Math.round((playerIndex * round.courseSlope) / 113);

  ////////
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(211, 47, 47)",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  const date = new Date(round.tournamentDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <Box>
      <PageHero title={date} backgroundImage={round.courseImg} />
      <Container sx={{ pb: 3, textAlign: "center" }}>
        <Box sx={{ mb: 2, mr: 2, textAlign: "end" }}>
          <Link to={`/tournaments/${round.tournamentDate}`}>
            Back to Tournament
          </Link>
        </Box>
        <Typography variant="h1">
          {round.username.split("-").join(" ")}
        </Typography>

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
                label="Handicap"
                value="3"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value="1">
            <RoundTable
              roundId={round.id}
              courseName={round.courseName}
              tournamentDate={round.tournamentDate}
              strokes={round.strokes}
              putts={round.putts}
              totalStrokes={round.totalStrokes}
              playerIndex={round.playerIndex}
              netStrokes={round.netStrokes}
              totalPutts={round.totalPutts}
              pars={round.pars}
            />

            {currentUser ? (
              <Box sx={{ mt: 5 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleOpen}
                  sx={{
                    "&:hover": { color: "white" },
                    mr: 1,
                    borderRadius: "30px",
                  }}
                >
                  <HighlightOffIcon /> <span className="ms-2">Delete</span>
                </Button>
                <Button
                  component={Link}
                  to={`/rounds/${id}/edit`}
                  variant="contained"
                  size="large"
                  sx={{
                    "&:hover": { color: "white" },
                    ml: 1,
                    borderRadius: "30px",
                  }}
                >
                  <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
                </Button>
              </Box>
            ) : null}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="2">
            {round.greenies.length ? (
              <GreenieCardList greenies={round.greenies} />
            ) : null}
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value="3">
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item md={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Golf Course
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{round.courseName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rating</TableCell>
                      <TableCell>{round.courseRating}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Slope</TableCell>
                      <TableCell>{round.courseSlope}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Last Four Rounds
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Total Strokes</TableCell>
                      <TableCell>Score Diff</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {round.recentScoreDiffs.map((diff) => (
                      <TableRow key={diff.tournamentDate}>
                        <TableCell>
                          {new Date(diff.tournamentDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              timeZone: "UTC",
                            }
                          )}
                        </TableCell>
                        <TableCell>{diff.totalStrokes}</TableCell>
                        <TableCell>{diff.scoreDifferential}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Player Index
                </Typography>
                <p>
                  Average of lowest two score differentials from last four
                  rounds played
                </p>
                <p>
                  {lowestTwoDiffs[0]} + {lowestTwoDiffs[1]} / 2 = {playerIndex}
                </p>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Course Handicap
                </Typography>
                <p>( Handicap Index × Course Slope ) / 113</p>
                <p>
                  {playerIndex} * {round.courseSlope} / 113 = {courseHandicap}
                </p>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" color="white">
              Are you Sure?
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              color="white"
            >
              This action will permanently erase all data associated with this
              round including greenies. Please confirm to proceed.
            </Typography>
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{ mr: 2, bgcolor: "gray" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="dark"
                sx={{ color: "white" }}
                onClick={() => handleDelete(round.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default RoundDetails;
