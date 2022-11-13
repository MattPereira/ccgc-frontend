import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Divider,
  Typography,
  Container,
  Box,
  Grid,
  Modal,
} from "@mui/material";

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

  return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Box sx={{ display: "inline-block" }}>
        <Typography variant="h1">
          {" "}
          {
            round.username
              .split("-")
              .map((n) => n[0].toUpperCase() + n.slice(1))[0]
          }
          's Round
        </Typography>
        <Divider
          role="presentation"
          sx={{ width: "50%", marginBottom: "1rem !important" }}
        />
        {currentUser ? (
          <Box sx={{ my: 3 }}>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleOpen}
              sx={{ "&:hover": { color: "white" }, mr: 1 }}
            >
              <HighlightOffIcon /> <span className="ms-2">Delete</span>
            </Button>
            <Button
              component={Link}
              to={`/rounds/${id}/edit`}
              variant="contained"
              size="large"
              sx={{ "&:hover": { color: "white" }, ml: 1 }}
            >
              <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
            </Button>
          </Box>
        ) : null}
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={12} sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              component={Link}
              to={`/tournaments/${round.tournamentDate}`}
              sx={{ textDecoration: "none" }}
            >
              {new Date(round.tournamentDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </Typography>
          </Box>

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
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={12}>
          {round.greenies.length ? (
            <GreenieCardList greenies={round.greenies} />
          ) : (
            "No Greenies Yet!"
          )}
          {/* <GreenieTable greenies={round.greenies} /> */}
        </Grid>
      </Grid>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="white">
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
  );
};

export default RoundDetails;
