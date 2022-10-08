import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import { useNavigate } from "react-router-dom";
import AdminButtons from "../../components/Common/AdminButtons/AdminButtons";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Divider, Typography } from "@mui/material";

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
  let navigate = useNavigate();
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

  const handleDelete = async () => {
    await CcgcApi.deleteRound(id, { username: currentUser.username });
    navigate(`/tournaments/${round.tournamentDate}`);
  };

  return (
    <Container className="py-5">
      <Typography variant="h1">
        {round.username
          .split("-")
          .map((n) => n[0].toUpperCase() + n.slice(1))
          .join(" ")}
        's Round
      </Typography>

      <Divider role="presentation" sx={{ width: "20%" }} />
      <div className="text-center row justify-content-center">
        {currentUser ? (
          currentUser.isAdmin || currentUser.username === round.username ? (
            <AdminButtons
              updatePath={`/rounds/${id}/edit`}
              handleDelete={handleDelete}
            />
          ) : null
        ) : null}

        <div className="mt-5">
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
        </div>

        <div className="mb-5">
          {currentUser ? (
            currentUser.isAdmin || currentUser.username === round.username ? (
              <div className="my-4">
                <Button
                  variant="contained"
                  component={Link}
                  to={`/greenies/new/${round.id}`}
                  sx={{
                    backgroundColor: "#198754",
                    "&:hover": { backgroundColor: "#157347", color: "white" },
                  }}
                >
                  Add Greenie
                </Button>
              </div>
            ) : null
          ) : null}
          <GreenieCardList greenies={round.greenies} />
        </div>
      </div>
    </Container>
  );
};

export default RoundDetails;
