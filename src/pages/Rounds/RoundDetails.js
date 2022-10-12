import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  Button,
  Divider,
  Typography,
  Container,
  Box,
  Grid,
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
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  console.debug("RoundDetails", "id=", id);

  const [round, setRound] = useState(null);

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

  const { greenies } = round;

  return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Box sx={{ display: "inline-block", mb: 3 }}>
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
        <Typography
          variant="h3"
          component={Link}
          to={`/tournaments/${round.tournamentDate}`}
          sx={{ textDecoration: "none" }}
        >
          {new Date(round.tournamentDate)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })
            .replaceAll("/", "-")}{" "}
          @ {round.courseName.split(" ").slice(0, 2).join(" ")}
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={12} sx={{ mb: 3 }}>
          {currentUser ? (
            <Box sx={{ my: 3 }}>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to={`/greenies/new/${round.tournamentDate}`}
                size="large"
                sx={{ "&:hover": { color: "white" }, mr: 0.5 }}
              >
                <AddCircleOutlineIcon /> <span className="ms-2">Greenie</span>
              </Button>
              <Button
                component={Link}
                to={`/rounds/${id}/edit`}
                variant="contained"
                size="large"
                sx={{ "&:hover": { color: "white" }, ml: 0.5 }}
              >
                <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
              </Button>
            </Box>
          ) : null}
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
          {greenies.length ? (
            <GreenieCardList greenies={greenies} />
          ) : (
            "No Greenies Yet!"
          )}
          {/* <GreenieTable greenies={round.greenies} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoundDetails;
