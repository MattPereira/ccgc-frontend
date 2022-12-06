import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";

import TournamentHero from "../../components/Tournaments/TournamentHero";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Divider,
  Typography,
  Container,
  Box,
  Modal,
  Tab,
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
      <TournamentHero date={date} courseImg={round.courseImg} />
      <Container sx={{ py: 3, textAlign: "center" }}>
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
