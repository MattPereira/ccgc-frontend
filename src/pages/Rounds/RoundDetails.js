import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import { Button, Divider, Typography, Container, Box } from "@mui/material";

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
        <Divider role="presentation" sx={{ width: "50%" }} />
      </Box>

      {currentUser ? (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to={`/greenies/new/${round.id}`}
            sx={{ mr: 1 }}
          >
            <AddCircleOutlineIcon /> <span className="ms-2">Greenie</span>
          </Button>
          <Button
            component={Link}
            to={`/rounds/${id}/edit`}
            variant="contained"
            sx={{ ml: 1, width: "122.791px" }}
          >
            <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
          </Button>
        </Box>
      ) : null}

      <Typography variant="h4" gutterBottom>
        {new Date(round.tournamentDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </Typography>

      <div className="text-center row justify-content-center">
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

        <div className="mb-5">
          <GreenieCardList greenies={round.greenies} />
        </div>
      </div>
    </Container>
  );
};

export default RoundDetails;
