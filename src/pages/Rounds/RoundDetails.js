import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import RoundTable from "../../components/Rounds/RoundTable";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../../components/Common/HorizontalRule/HorizontalRule";
import AdminButtons from "../../components/Common/AdminButtons/AdminButtons";
import UserContext from "../../components/Auth/UserContext";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button } from "@mui/material";

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
    await CcgcApi.deleteRound(id);
    navigate(`/tournaments/${round.tournamentDate}`);
  };

  //transform a username like "tom-moore" to "Tom Moore"
  const transformUsername = (username) => {
    const nameArr = username.split("-");
    let result = "";
    for (let name of nameArr) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      result += name + " ";
    }
    return result.trim();
  };

  return (
    <Container className="mt-5">
      <div className="text-center row justify-content-center">
        <h1 className="display-3">
          {transformUsername(round.username)}'s Round
        </h1>

        <HorizontalRule width="30%" />
        {currentUser ? (
          currentUser.isAdmin ? (
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
