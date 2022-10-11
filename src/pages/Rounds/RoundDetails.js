import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCard from "../../components/Greenies/GreenieCard";
import { Link } from "react-router-dom";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

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

        <Typography
          variant="h4"
          component={Link}
          to={`/tournaments/${round.tournamentDate}`}
          sx={{ textDecoration: "none" }}
        >
          {new Date(round.tournamentDate)
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              timeZone: "UTC",
            })
            .replaceAll("/", "-")}
        </Typography>
      </Box>

      {currentUser ? (
        <Box sx={{ my: 5 }}>
          <Button
            component={Link}
            to={`/rounds/${id}/edit`}
            variant="contained"
            sx={{ "&:hover": { color: "white" } }}
          >
            <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
          </Button>
        </Box>
      ) : null}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} lg={12}>
          <Typography variant="h3" gutterBottom>
            Scores
          </Typography>
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
        <Grid item xs={12} sm={6} lg={12}>
          <Typography variant="h3" gutterBottom>
            Greenies
          </Typography>

          {greenies.length ? (
            <Grid container spacing={4} justifyContent="center">
              {greenies.map((g) => (
                <Grid item xs={9} sm={10} md={8} lg={3} key={g.id}>
                  <GreenieCard id={g.id} key={g.id} greenie={g} />
                </Grid>
              ))}{" "}
            </Grid>
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
