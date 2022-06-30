import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import RoundTable from "./RoundTable";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../common/HorizontalRule";
import AdminButtons from "../common/AdminButtons";
import UserContext from "../auth/UserContext";

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

  //transform a username like "tom-moore" to "Tom Moore" lol
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
    <div className="text-center row justify-content-center">
      <h1 className="display-3">{transformUsername(round.username)}'s Round</h1>

      <HorizontalRule width="30%" />
      <div className="my-3">
        {currentUser ? (
          currentUser.username === round.username || currentUser.isAdmin ? (
            <AdminButtons
              updatePath={`/rounds/${id}/edit`}
              handleDelete={handleDelete}
            />
          ) : null
        ) : null}
      </div>

      <div className="mb-5">
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
    </div>
  );
};

export default RoundDetails;
