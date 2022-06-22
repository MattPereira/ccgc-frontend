import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import RoundTable from "./RoundTable";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../common/HorizontalRule";
import EditDeleteBtns from "../common/EditDeleteBtns";
import UserContext from "../auth/UserContext";

/**
 * Round details page
 *
 * fetch round details from API
 *
 * offer edit and delete buttons for logged in users.
 *
 * Only show edit and delete buttons if isAdmin or
 * if the user is the owner of the round
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

  return (
    <div className="text-center row justify-content-center">
      <h1 className="display-3">
        {round.username.split("-").join(" ")}'s Round
      </h1>

      <HorizontalRule width="30%" />
      {currentUser.username === round.username || currentUser.isAdmin ? (
        <EditDeleteBtns
          editPath={`/rounds/${id}/edit`}
          handleDelete={handleDelete}
        />
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
      />
    </div>
  );
};

export default RoundDetails;
